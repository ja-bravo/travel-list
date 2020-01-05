import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import withApollo from 'next-with-apollo';

const httpLink = new HttpLink({ uri: process.env.NODE_ENV === 'production' ? '/graphql' : 'http://localhost:3005/graphql' });
const authLink = setContext(async (_: any, { headers }: any) => {
  const token = await localStorage.getItem('tmwrkjwt');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
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
      cache: new InMemoryCache().restore(initialState || {}),
      resolvers: {
        Mutation: {
          setUser: (_, { user }, { cache }) => {
            cache.writeData({ data: { user } });
            return user;
          },
        },
      },
      typeDefs: `
    type User {
      id: String!
      firstName: String
      lastName: String
      email: String
      confirmed: Boolean
      password: String
      role: String
      company: String
      jwtToken: String
    }

    type Query {
      user: User
    }

    type Mutation {
      setUser(user: User): User
    }
    `,
    }),
  { getDataFromTree: 'ssr' },
);
