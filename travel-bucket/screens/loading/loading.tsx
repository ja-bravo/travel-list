import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useContext, useEffect, useRef } from 'react';
import { Animated, Dimensions, AsyncStorage } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import styled from 'styled-components/native';
import Page from '../../components/page';
import { UserContext } from '../../utils/userContext';
import Logo from './logo';

const Wrapper = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const REHYDRATE = gql`
  mutation rehydrate($token: String) {
    res: rehydrate(token: $token) {
      id
      email
      jwtToken
    }
  }
`;

const LoadingScreen: React.FC<{ navigation: NavigationScreenProp<any> }> = ({ navigation }) => {
  const scaleValue = useRef(new Animated.Value(0.5));
  const goTo = (SCREEN, type?) => {
    setTimeout(
      () => {
        Animated.timing(scaleValue.current, { toValue: 1, useNativeDriver: true }).start(() => {
          navigation.navigate({ routeName: SCREEN, params: type ? { type } : {} });
        });
      },
      __DEV__ ? 1000 : 1000,
    );
  };

  const [rehydrate] = useMutation(REHYDRATE);

  const userCtx = useContext(UserContext);

  useEffect(() => {
    AsyncStorage.getItem('travel-app-jwt-2020')
      .then(async token => {
        const res = await rehydrate({ variables: { token } });
        if (res.data && res.data.res && res.data.res.id) {
          const result = res.data.res;
          AsyncStorage.setItem('travel-app-jwt-2020', result.jwtToken);
          userCtx.setUser(result);
          goTo('AppStack');
        } else {
          goTo('LoginStack');
        }
      })
      .catch(e => {
        goTo('LoginStack');
      });

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue.current, {
          toValue: 0.8,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue.current, {
          toValue: 0.5,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();

    return () => animation.stop();
  }, []);

  const AnimatedLogo = Animated.createAnimatedComponent(Logo);
  return (
    <Page>
      <Wrapper>
        <AnimatedLogo
          style={{
            width: Dimensions.get('screen').width * 1,
            transform: [{ scale: scaleValue.current }],
          }}
          resizeMode="contain"
        />
      </Wrapper>
    </Page>
  );
};

export default LoadingScreen;
