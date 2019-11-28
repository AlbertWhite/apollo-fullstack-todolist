
import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const ADD_USER = gql`
  mutation addUser($name: String!){
    addUser(name: $name) {
      users{
        id
        name
      }
      success
    }
  }
`

const Add: React.FC = () => {
  // options for useMutation: https://www.apollographql.com/docs/react/api/react-hooks/#options-2
  const [addUser, {data, loading, error}] = useMutation(ADD_USER) // cannot use mutation in callback
  console.warn('alb mutation',{data});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;
  return (
    <button onClick={e => {addUser({variables: {name: '123'}})}}>Add User</button>
  )
}
export default Add