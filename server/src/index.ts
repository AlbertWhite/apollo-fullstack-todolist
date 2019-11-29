const { ApolloServer } = require('apollo-server')
const { gql } = require('apollo-server')

// schema.js
const typeDefs = gql`
  type Query {
    users: [User]
  }

  type Mutation {
    addUser(name: String!): UserResponse!
    deleteUser(id: ID!): UserResponse
    editUser(id: ID!, name: String!): UserResponse!
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
`

let users = [
  {
    id: `user1`,
    name: 'albert',
    items: [
      {
        id: `item1`,
        content: 'default item',
        finished: false 
      }
    ]
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
      id: `user${Math.floor(Math.random() * 100)}`,
      name: name,
      items: []
    })
    return {users, success: true}
    },
    deleteUser: (_:any, {id}:any) => {
      users = users.filter(user => user.id != id)
      return {users: users.filter(user => user.id != id), success: true}
    },
    editUser: (_:any, {id, name}:any) => {
      users = users.map(user => {if(user.id == id) {return {id, name, items: []}} return user})
      return {users: users.map(user => {if(user.id == id) {return {id, name, items: []}} return user}), success: true}
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
})

server.listen({ port: 4000 }).then(() => {
  console.warn('server has been launched')
})
