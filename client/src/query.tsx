import { gql } from 'apollo-boost'

export const GET_USER = gql`
  {
    users {
      id
      name
      todos {
        id
        content
        finished
      }
    }
  }
`

export const ADD_USER = gql`
  mutation addUser($name: String!) {
    addUser(name: $name) {
      users {
        id
        name
        todos {
          id
          content
          finished
        }
      }
      success
    }
  }
`

export const ADD_TODO = gql`
  mutation addTodo($content: String!, $userId: ID!) {
    addTodo(content: $content, userId: $userId) {
      success
      userId
      todos {
        id
        content
        finished
      }
    }
  }
`

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      users {
        name
        id
        todos {
          id
          content
          finished
        }
      }
      success
    }
  }
`

export const EDIT_USER = gql`
  mutation editUser($name: String!, $id: ID!) {
    editUser(name: $name, id: $id) {
      users {
        name
        id
        todos {
          id
          content
          finished
        }
      }
      success
    }
  }
`

export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!, $userId: ID!) {
    deleteTodo(id: $id, userId: $userId) {
      userId
      todos {
        id
        content
        finished
      }
      success
    }
  }
`

export const EDIT_TODO = gql`
  mutation editTodo(
    $id: ID!
    $userId: ID!
    $content: String!
    $finished: Boolean!
  ) {
    editTodo(id: $id, userId: $userId, content: $content, finished: $finished) {
      userId
      todos {
        id
        content
        finished
      }
      success
    }
  }
`
