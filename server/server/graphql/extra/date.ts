import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import moment from 'moment';

export default new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return moment(value);
  },
  serialize(value: moment.Moment) {
    if (typeof value === 'string') value = moment(value);

    return value.format ? value.format('HH:mm:ss DD/MM/YYYY') : value;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return moment(ast.value);
    }
    return null;
  },
});
