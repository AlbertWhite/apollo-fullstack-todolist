const { ApolloServer } = require('apollo-server')
const { gql } = require('apollo-server')

// schema.js
const typeDefs = gql`
  type Query {
    users: [User]
  }

  # type Mutation {
  #   addUser()
  # }

  type Item {
    id: ID!
    content: String!
    finished: Boolean!
  }

  type User {
    id: ID!
    name: String!
    items: [Item]
  }

  # use fragment
`

const resolvers = {
  Query: {
    users: async () => {
      return [
        {
          id: 1,
          name: 'albert',
          items: []
        }
      ]
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error: any) => {
    // show error
    console.log(error)
    return error
  }
  //dataSources
})

server.listen({ port: 4000 }).then(() => {
  console.warn('server has been launched')
})
