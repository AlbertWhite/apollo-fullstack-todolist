import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const ADD_USER = gql`
  mutation addUser($name: String!) {
    addUser(name: $name) {
      users {
        id
        name
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

const Add: React.FC = () => {
  // options for useMutation: https://www.apollographql.com/docs/react/api/react-hooks/#options-2
  const [addUser, { loading, error }] = useMutation(ADD_USER, {
    update(cache, { data }) {
      cache.writeQuery({
        query: GET_USER,
        data: {users: data.addUser.users}
      })
    }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>An error occurred</p>

  return (
    <button
      onClick={e => {
        addUser({ variables: { name: '123' } })
      }}
    >
      Add User
    </button>
  )
}
export default Add
