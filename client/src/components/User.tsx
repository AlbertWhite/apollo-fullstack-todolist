import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

interface UserProps { 
  name: string
  id: string 
}

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id){
      users{
        name
        id
      }
      success
    }
  }
`


const GET_USER = gql`
  {
    users {
      id
      name
    }
  }
`

const User: React.FC<UserProps> = ({ name, id }: UserProps) => {

  const [deleteUser, {loading, error}] = useMutation(DELETE_USER, {
    update(cache, { data }) {
      console.warn('alb', data.deleteUser.users);
      cache.writeQuery({
        query: GET_USER,
        data: {users: data.deleteUser.users}
      })
    }
  })

  return (
    <div>
      {name}
      <button onClick={() => { }}>Edit</button>
      <button onClick={e => {deleteUser({variables: {id}})}}>Delete</button>
    </div >
  )
}

export default User