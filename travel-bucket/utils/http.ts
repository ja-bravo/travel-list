import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
declare var process;
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { AsyncStorage } from 'react-native';
import { PROD_URL } from './constants';

export default class Http {
  public static apolloClient: any;
  public static setUp() {
    const authLink = setContext(async (_, { headers }) => {
      const token = await AsyncStorage.getItem('travel-app-jwt-2020');
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    });

    const httpLink = createHttpLink({
      uri: process.env.NODE_ENV === 'production' ? PROD_URL : `http://localhost:3005/graphql`,
    });
    this.apolloClient = new ApolloClient({
      link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors) {
            graphQLErrors.map(({ message, locations, path }) =>
              console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
            );
          }
          if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        authLink,
        httpLink,
      ]),
      cache: new InMemoryCache(),
      connectToDevTools: true,
      resolvers: {
        Mutation: {
          setUser: (_, { user }, { cache }) => {
            cache.writeData({ data: { user } });
            return user;
          },
        },
      },
    });
  }
}
