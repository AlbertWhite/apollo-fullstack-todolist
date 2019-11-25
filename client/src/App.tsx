import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const EXCHANGE_RATES = gql`
  {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`

const App: React.FC = () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div className="App">
      {data.rates.map(
        ({ currency, rate }: { currency: string; rate: string }) => (
          <div>{currency}</div>
        )
      )}
    </div>
  )
}

export default App
