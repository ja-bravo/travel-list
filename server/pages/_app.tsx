import { ApolloProvider } from '@apollo/react-hooks';
import MomentUtils from '@date-io/moment';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import App from 'next/app';
import Head from 'next/head';
import React, { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import UserProvider, { UserContext } from '../contexts/userContext';
import withApollo from '../hocs/withApollo';

const GlobalStyle = createGlobalStyle`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type=number] {
    -moz-appearance:textfield; /* Firefox */
  }
`;

const Content = ({ component, pageProps }) => {
  const Component = component;
  const ctx = useContext(UserContext);
  return (
    <>
      <Head>
        <title>TMWRK</title>
      </Head>
      <ThemeProvider theme={ctx.theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};
class MyApp extends App<any, any> {
  public componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  public render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <UserProvider>
            <Content component={Component} pageProps={pageProps} />
          </UserProvider>
        </MuiPickersUtilsProvider>
      </ApolloProvider>
    );
  }
}
export default withApollo(MyApp);
