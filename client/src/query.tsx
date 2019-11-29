import {gql} from 'apollo-boost'

export const GET_USER = gql`
  {
    users {
      id
      name
      items{
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
        items{
          id
          content
          finished
        }
      }
      success
    }
  }
`

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id){
      users{
        name
        id
        items{
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
        items
      }
      success
    }
}
`