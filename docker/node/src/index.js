const {createServer} = require('http')
const {ApolloServer} = require('apollo-server-express')
const express = require('express')

const {resolvers} = require('./resolvers')
const {typeDefs} = require('./schema')

const PORT = 3000
const app = express()

//エラーハンドリング？
process.on('uncaughtException', err => console.error(err))
process.on('unhandledRejection', err => console.error(err))

// CORSを許可する
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

//apolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers
})
server.applyMiddleware({app, path: '/graphql'})

const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

// ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
httpServer.listen({port: PORT}, () => {
  // console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  // console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
  console.log(`🚀 Server ready at http://localhost:8092${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:8092${
    server.subscriptionsPath
  }`)
})
