import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const EXCHANGE_RATES = gql`
  {
    users {
      name
    }
  }
`

const App: React.FC = () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  console.warn('alb', { data })

  return (
    <div className="App">
      {data.users.map((user: any) => {
        return <>{user.name}</>
      })}
    </div>
  )
}

export default App
