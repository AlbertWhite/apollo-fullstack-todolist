import {gql} from 'apollo-boost'

export const GET_USER = gql`
  {
    users {
      id
      name
      todos{
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
        todos{
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
  mutation addTodo($content: String!, $userId: String!) {
    addTodo(content: $content, userId: $userId){
      success
      userId
      todos{
        id
        content
        finished
      }
    }
  }
`

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id){
      users{
        name
        id
        todos{
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
    editUser(name: $name, id: $id){
      users{
        name
        id
        todos
      }
      success
    }
}
`