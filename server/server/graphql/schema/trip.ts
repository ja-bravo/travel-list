import { gql } from 'apollo-server-core';

const Trip = gql`
  type Trip {
    id: String
    name: String
    destinations: [Destination]
  }
`;

export default Trip;
