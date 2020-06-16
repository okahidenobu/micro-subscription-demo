const {gql} = require('apollo-server-express')
// Construct a schema, using GraphQL schema language
exports.typeDefs = gql`
    type Query {
        getUsers:[User]
    }

    type User {
        id:Int
        firstName:String
        lastName:String
        #        createdAt:String
        #        updatedAt:String
    }

    type Mutation {
        addUser(firstName:String,lastName:String): User
        updateUser(id: Int!,firstName: String,lastName: String):User
        deleteUser(id:Int!):User
    }

    type Subscription {
        userAdded: User
        userUpdated: User
        userDeleted: User
    }
`