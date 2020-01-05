import { gql, makeExecutableSchema } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import { and, or, rule, shield } from 'graphql-shield';
import jwtHelper from '../../utils/jwt';
import Mutations from '../mutations';
import Queries from '../queries';
import Resolver from '../resolvers';
import Destination from './destination';
import TodoItem from './todoItem';
import Trip from './trip';
import User from './user';

const Query = gql`
  scalar Date

  ${Mutations}
  ${Queries}

  scalar LatLon
  {
    lat: Float
    lon: Float
  }
`;

const isLogged = rule()(async (parent, args, ctx, info) => {
  const valid = jwtHelper.verify(ctx.cleanToken);
  // Can't return just 'valid', the rule element doesn't equates true to a created item
  return valid ? true : false;
});

const permissions = shield({
  Mutation: {},
  Query: {},
});
const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs: [Query, User, Destination, Trip, TodoItem],
    resolvers: { Date, ...Resolver },
  }),
  permissions,
);
export default schema;
