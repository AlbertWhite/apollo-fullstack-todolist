import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'

// https://www.apollographql.com/docs/react/get-started/#configuration-options for ApolloClient
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
