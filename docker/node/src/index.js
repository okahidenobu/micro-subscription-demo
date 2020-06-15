const {ApolloServer, gql} = require("apollo-server-micro")
const {PubSub} = require("graphql-subscriptions")
const micro = require("micro")
const http = require("http")
const {User} = require("./models")
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

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const PORT = 3000
const handler = server.createHandler()
const httpServer = new http.Server(handler)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:8092`)
  console.log(`🚀 Subscriptions ready at ws://localhost:8092`)
})

