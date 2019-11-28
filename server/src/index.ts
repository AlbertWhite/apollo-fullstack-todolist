const { ApolloServer } = require('apollo-server')
const { gql } = require('apollo-server')

// schema.js
const typeDefs = gql`
  type Query {
    users: [User]
  }

  type Mutation {
    addUser(name: String!): UserResponse!
  }

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

  type UserResponse{
    success: Boolean!,
    users: [User]
  }

  # use fragment
`
const users = [
  {
    id: 1,
    name: 'albert',
    items: []
  }
]

const resolvers = {
  Query: {
    users: async () => {
      return users
    }
  },
  Mutation: {
   addUser: (_:any, {name}:any) => {
    users.push({
      id: Math.floor(Math.random() * 100),
      name: name,
      items: []
    })
    return {users, success: true}
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
