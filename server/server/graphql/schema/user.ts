import { gql } from 'apollo-server-core';

const User = gql`
  type User {
    id: String
    name: String
    email: String
    password: String
    jwtToken: String
  }

  input UserInput {
    email: String
    password: String
    jwtToken: String
  }
`;

export default User;
