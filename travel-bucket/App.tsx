import React, { useEffect, useState } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import LoadingScreen from './screens/loading';
import { palette } from './utils/style';
import { Image } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Transition } from 'react-native-reanimated';
import { ApolloProvider } from '@apollo/react-hooks';
import UserProvider from './utils/userContext';
import DestinationScreen from './screens/destination';
import TripScreen from './screens/trip/tripScreen';
import ChangeCover from './screens/changeCover';
import RegisterScreen from './screens/register';

import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

import Http from './utils/http';
Http.setUp();

const navigationOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: palette.whiteBackground,
    height: 60,
    borderBottomWidth: 0,
    elevation: 0,
  },

  headerTitle: () => <Image source={require('./assets/topLogo.png')} resizeMode="contain" style={{ height: 40 }} />,
  headerTintColor: palette.blackBackground,
});

const LoginStack = createStackNavigator(
  {
    Login: {
      navigationOptions,
      screen: LoginScreen,
    },
    Register: {
      navigationOptions,
      screen: RegisterScreen,
    },
  },

  {
    headerLayoutPreset: 'center',
  },
);

const AppStack = createStackNavigator(
  {
    Home: {
      navigationOptions,
      screen: HomeScreen,
    },
    Trip: {
      navigationOptions,
      screen: TripScreen,
    },
    Destination: {
      navigationOptions,
      screen: DestinationScreen,
    },
    ChangeCover: {
      navigationOptions,
      screen: ChangeCover,
    },
  },
  {
    headerLayoutPreset: 'center',
  },
);

const AppNavigator = createAnimatedSwitchNavigator(
  {
    AppStack,
    LoginStack,
    Loading: LoadingScreen,
  },
  {
    transition: (
      <Transition.Together>
        <Transition.Out type="fade" durationMs={200} interpolation="easeIn" />
        <Transition.In type="fade" durationMs={250} />
      </Transition.Together>
    ),
    initialRouteName: 'Loading',
  },
);

const Container = createAppContainer(AppNavigator);
const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    Font.loadAsync({
      'Montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'Montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    }).then(r => setFontsLoaded(true));
  }, []);

  return (
    <ApolloProvider client={Http.apolloClient}>
      <UserProvider>{fontsLoaded ? <Container /> : <AppLoading />}</UserProvider>
    </ApolloProvider>
  );
};
export default App;
