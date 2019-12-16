const { ApolloServer } = require('apollo-server')
const { gql } = require('apollo-server')

// schema.js
const typeDefs = gql`
  type Query {
    users: [User]
  }

  type Mutation {
    addUser(name: String!): UserResponse!
    addTodo(content: String!, userId: ID!): TodosResponse!
    deleteTodo(userId: ID!, id: ID!): TodosResponse!
    editTodo(
      userId: ID!
      id: ID!
      content: String!
      finished: Boolean!
    ): TodosResponse!
    deleteUser(id: ID!): UserResponse
    editUser(id: ID!, name: String!): UserResponse!
  }

  type Todo {
    id: ID!
    content: String!
    finished: Boolean!
  }

  type User {
    id: ID!
    name: String!
    todos: [Todo]
  }

  type UserResponse {
    success: Boolean!
    users: [User]
  }

  type TodosResponse {
    success: Boolean!
    userId: ID!
    todos: [Todo]
  }
`

let users = [
  {
    id: `user1`,
    name: 'albert',
    todos: [
      {
        id: `todo1`,
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
    addUser: (_: any, { name }: {name: string}) => {
      users.push({
        id: `user${Math.floor(Math.random() * 100)}`,
        name,
        todos: []
      })
      return { users, success: true }
    },
    deleteUser: (_: any, { id }: {id: string}) => {
      users = users.filter(user => user.id != id)
      return { users: users.filter(user => user.id != id), success: true }
    },
    editUser: (_: any, { id, name }: {id: string, name: string}) => {
      users = users.map(user => {
        if (user.id == id) {
          return { id, name, todos: [] }
        }
        return user
      })
      return {
        users: users.map(user => {
          if (user.id == id) {
            return { id, name, todos: [] }
          }
          return user
        }),
        success: true
      }
    },
    addTodo: (_: any, { content, userId }: {content: string, userId: string}) => {
      let todos
      users = users.map(user => {
        if (user.id == userId) {
          todos = user.todos
          todos.push({
            id: `todo${Math.floor(Math.random() * 100)}`,
            content,
            finished: false
          })
          return {
            ...user,
            todos
          }
        }
        return user
      })

      return {
        success: true,
        userId,
        todos
      }
    },
    deleteTodo: (_: any, { userId, id }: {userId: string, id: string}) => {
      let todos
      users = users.map(user => {
        if (user.id == userId) {
          todos = user.todos.filter(todo => todo.id != id)
          return {
            ...user,
            todos
          }
        }
        return user
      })

      return {
        success: true,
        userId,
        todos
      }
    },
    editTodo: (_: any, { userId, id, content, finished }: { userId: string, id: string, content: string, finished: boolean }) => {
      let todos
      users = users.map(user => {
        if (user.id == userId) {
          todos = user.todos.map(todo => {
            if (todo.id == id) {
              return {
                id,
                content,
                finished
              }
            }
            return todo
          })
          return {
            ...user,
            todos
          }
        }
        return user
      })

      return {
        success: true,
        userId,
        todos
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error: string) => {
    // show error
    console.log(error)
    return error
  }
})

server.listen({ port: 4000 }).then(() => {
  console.warn('server has been launched')
})
