const {createServer} = require('http')
const {ApolloServer, gql} = require('apollo-server-express')
const express = require('express')

const {resolvers} = require('./resolvers')

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Query {
        getUsers:[User]
    }

    type User {
        id:ID
        firstName:String
        lastName:String
        #        createdAt:String
        #        updatedAt:String
    }

    type Mutation {
        addUser(firstName:String,lastName:String): User
    }

    type Subscription {
        userAdded: User
    }
`

const PORT = 3000
const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.applyMiddleware({app})

const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

// ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
httpServer.listen(PORT, () => {
  // console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  // console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
  console.log(`🚀 Server ready at http://localhost:8092`)
  console.log(`🚀 Subscriptions ready at ws://localhost:8092`)
})
