import { ApolloError } from 'apollo-server-core';
import { Errors } from '../../shared';

export default class Error extends ApolloError {
  public static Errors = Errors;
  constructor(code: string | number, message: string) {
    super(message, code as string);
  }
}
