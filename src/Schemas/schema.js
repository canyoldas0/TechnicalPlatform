export const typeDefs = `
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
  }
  type Query {
    user(id: ID!): User
    allUsers: [User]
    userExists(email: String!): Boolean
  }
  
  type Mutation {
    createUser(name: String!, email: String!, password: String!): User
    updateUser(id: ID!, name: String!, email: String!, password: String!): User
    deleteUser(id: ID!): User
  }
`;
