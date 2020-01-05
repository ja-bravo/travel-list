import React, { useState, useContext, useRef } from 'react';
import Page from '../../components/page';
import Input from '../../components/input';
import { TextInput, Keyboard, Alert, AsyncStorage } from 'react-native';
import styled from 'styled-components/native';
import Button from '../../components/button';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { GQLUser, GQLUserInput } from 'travel-bucket-shared';
import { UserContext } from '../../utils/userContext';
import { NavigationScreenProp } from 'react-navigation';
import { extractGraphQLError } from '../../utils/errors';

const Inputs = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;

const Wrapper = styled.KeyboardAvoidingView`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 30%;
`;

const REGISTER = gql`
  mutation register($user: UserInput) {
    user: register(user: $user) {
      id
      email
      jwtToken
    }
  }
`;

const RegisterScreen: React.FC<{ navigation: NavigationScreenProp<any> }> = ({ navigation }) => {
  const [email, setEmail] = useState(__DEV__ ? 'test' : '');
  const [password, setPassword] = useState(__DEV__ ? '1234' : '');

  const passwordRef = useRef<TextInput>();
  const [register] = useMutation<{ user: GQLUser }, { user: GQLUserInput }>(REGISTER);
  const userCtx = useContext(UserContext);

  return (
    <Page onPress={Keyboard.dismiss} style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Wrapper behavior="padding">
        <Inputs>
          <Input
            label="Email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            type="black"
            containerStyle={{ marginBottom: 32 }}
            onSubmitEditing={() => passwordRef.current!.focus()}
          />
          <Input
            label="Password"
            ref={r => (passwordRef.current = r!)}
            keyboardType="default"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            type="black"
          />
        </Inputs>

        <Button
          text="Sign Up"
          type="red"
          onPress={async () => {
            if (email && password) {
              try {
                const res = await register({ variables: { user: { email, password } } });
                if (res.data && res.data.user) {
                  userCtx.setUser(res.data.user);
                  AsyncStorage.setItem('travel-app-jwt-2020', res.data.user.jwtToken);
                  navigation.navigate('Home');
                } else {
                  Alert.alert('Error');
                }
              } catch (e) {
                Alert.alert('Error', extractGraphQLError(e));
              }
            }
          }}
        />
      </Wrapper>
    </Page>
  );
};

export default RegisterScreen;
