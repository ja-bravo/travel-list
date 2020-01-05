import { gql } from 'apollo-server-core';

const Destination = gql`
  type Destination {
    id: String
    name: String
    startDate: String
    endDate: String
    image: String
    tripID: String
    todoItems: [TodoItem]
  }

  input DestinationInput {
    id: String
    name: String
    startDate: String
    endDate: String
    image: String
    todoItems: [TodoItemInput]
    tripID: String
  }
`;

export default Destination;
