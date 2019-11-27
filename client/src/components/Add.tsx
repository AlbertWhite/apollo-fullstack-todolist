
import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const ADD_USER = gql`
  mutation addUser($name: String!){
  addUser(name: $name) {
    id
    name
  }
}
`

const Add: React.FC = () => {
  const [mutation, {data, loading, error}] = useMutation(ADD_USER, {variables: {name: '123'}}) // cannot use mutation in callback
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;
  console.warn('alb',{data});
  return (
    <button onClick={e => mutation}>Add User</button>
  )
}
export default Add