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
    },
    async updateUser(parent, args, context) {
      await users.updateUser(args.id, args)
      await pubsub.publish("updated", args)
      return args
    },
    async deleteUser(parent, args, context) {
      await users.deleteUser(args.id)
      await pubsub.publish("deleted", args)
      return args
    },
  },

  Subscription: {
    userAdded: {
      resolve: (payload) => {
        return payload
      },
      subscribe: () => pubsub.asyncIterator("added")
    },
    userUpdated: {
      resolve: (payload) => {
        return payload
      },
      subscribe: () => pubsub.asyncIterator("updated")
    },
    userDeleted: {
      resolve: (payload) => {
        return payload
      },
      subscribe: () => pubsub.asyncIterator("deleted")
    }
  }
}