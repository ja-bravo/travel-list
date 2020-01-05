import { useMutation } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../contexts/userContext';

const REHYDRATE = gql`
  mutation rehydrate($token: String) {
    user: rehydrate(token: $token) {
      id
      name
      jwtToken
      email
    }
  }
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function withAuth(AuthComponent: any) {
  const Authenticated = (props: any) => {
    const [rehydrate] = useMutation(REHYDRATE);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const ctx = useContext(UserContext);
    useEffect(() => {
      if (!ctx!.user && localStorage) {
        rehydrate({ variables: { token: localStorage.getItem('tmwrkjwt') } })
          .then(res => {
            if (res.data && res.data.user) {
              ctx!.setUser(res.data.user);
              localStorage.setItem('tmwrkjwt', res.data.user.jwtToken as string);
              setIsLoading(false);
            } else {
              const goTo = router.asPath;
              localStorage.setItem('goTo', goTo);
              router.replace('/login');
            }
          })
          .catch(_e => {
            const goTo = router.asPath;
            localStorage.setItem('goTo', goTo);
            router.replace('/login');
          });
      } else if (ctx!.user) {
        setIsLoading(false);
      }
    }, []);
    return isLoading ? (
      <Wrapper>
        <CircularProgress color="primary" />
      </Wrapper>
    ) : (
      <AuthComponent {...props} />
    );
  };

  Authenticated.getInitialProps = async (ctx: any) => {
    // Ensures material-ui renders the correct css prefixes server-side
    let userAgent;
    if (process.browser) {
      userAgent = navigator.userAgent;
    } else {
      userAgent = ctx.req.headers['user-agent'];
    }
    // Check if Page has a `getInitialProps`; if so, call it.
    const pageProps = AuthComponent.getInitialProps && (await AuthComponent.getInitialProps(ctx));
    // Return props.
    return { ...pageProps, userAgent, isClient: !!!ctx.req };
  };

  return Authenticated;
}
