const users = require('./users')
const {PubSub} = require('graphql-subscriptions')
const pubsub = new PubSub()

exports.resolvers = {
  Query: {
    getUsers: async (root, args, context) => users.getAllUsers()
  },
  Mutation: {
    addUser: async (root, args, context) => {
      const user = await users.createUser(args)
      await pubsub.publish("added", user)
      return user
    }
  },

  Subscription: {
    userAdded: {
      resolve: (payload) => {
        return payload
      }
      ,
      subscribe: () => pubsub.asyncIterator("added")
    }
  }
}