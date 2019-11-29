knex + postgreSQL for database

CRUD: delete may cause manipulating cache directly

https://github.com/AlbertWhite/graphql-react/tree/master/react-graphql-apollo

https://github.com/AlbertWhite/graphql-server

https://github.com/AlbertWhite/graphql-demo/tree/master/query

https://github.com/AlbertWhite/full-stack-apollo-demo

Client

1. setup create react app with typescript
2. install apollo-boost for writing gql query and ApolloClient. install @apollo/react-hooks for useQuery.

Server

1. Always make the dev from the back, make a test and use it in front.
2. add eslint, typescript and nodemon with nodemon config
3. create typeDefs (schema), resolvers and (dataSources) and config ApolloServer
4. add mutation
3.1 define schema
```graphql

type User {
  id: ID!
  name: String!
}

type Mutation {
  addUser(name: String!): UserResponse!
}

type UserResponse {
  success: Boolean!
  users: [User]!
}
```

3.2 write query
```graphql
mutation addUser($name: String!) {
  addUser(name: $name) {
    success
    users {
      name
    }
  }
}
```

3.3 write resolvers

3.4 write mutation and update cache by cache.writeQuery. writeQuery trigger trigger the query and rerender the component.

Todo:
3. Add todo list
4. Backend recommendation with dataSource? 

Question
1. Cannot use useQuery and useMutation together