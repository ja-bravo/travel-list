import { gql } from 'apollo-server-express';

const Mutations = gql`
  type Mutation {
    rehydrate(token: String): User
    signIn(user: UserInput): User
    register(user: UserInput): User
    createOrUpdateDestination(destination: DestinationInput): Destination
    createTrip(name: String): Trip
    updateTrip(id: String, name: String): Trip
  }
`;
export default Mutations;
