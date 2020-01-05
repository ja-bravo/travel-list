import { gql } from 'apollo-server-core';

const TodoItem = gql`
  type TodoItem {
    name: String
    completed: Boolean
  }

  input TodoItemInput {
    name: String
    completed: Boolean
  }
`;

export default TodoItem;
