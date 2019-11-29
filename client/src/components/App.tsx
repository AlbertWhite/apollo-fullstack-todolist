import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_USER } from '../query'
import User from './User'
import Add from './Add'


// https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates how to make add and get work together 
const App: React.FC = () => {
  const { loading, error, data } = useQuery(GET_USER)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  
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
