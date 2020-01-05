import { gql } from 'apollo-server-express';

const Queries = gql`
  type Query {
    getTrips: [Trip]
    getTrip(tripID: String): Trip
    getDestinations(tripID: String): [Destination]
  }
`;
export default Queries;
