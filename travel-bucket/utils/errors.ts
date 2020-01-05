import { Errors } from 'travel-bucket-shared';

const getErrorFromCode = (code: Errors) => {
  switch (code) {
    case Errors.alreadyExists:
      return 'User already exists';
    case Errors.incorrectCredentials:
      return 'Incorrect credentials';
    default:
      return 'Unexpected error';
  }
};

export const extractGraphQLError = (e: any, defaultMessage = 'Unexpected error') => {
  if (e && e.graphQLErrors) {
    if (e.graphQLErrors[0]) {
      const ext = e.graphQLErrors[0].extensions;
      if (ext) {
        const code = ext.code;
        const errorMessage = ext.message;
        const message = code ? getErrorFromCode(code) : errorMessage || defaultMessage;
        return message;
      } else {
        return defaultMessage;
      }
    } else {
      return defaultMessage;
    }
  } else {
    return defaultMessage;
  }
};
export default getErrorFromCode;
