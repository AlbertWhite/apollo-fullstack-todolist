import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import User from './components/User'
import Add from './components/Add'

const GET_USER = gql`
  {
    users {
      id
      name
    }
  }
`
// https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates how to make add and get work together 
const App: React.FC = () => {
  const { loading, error, data } = useQuery(GET_USER)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  console.warn('alb query', { data })

  
  return (
    <div className="App">
      {data.users.map((user: any) => {
        return <User name={user.name} id={user.id}/>
      })}
      <Add/>
    </div>
  )
}

export default App
