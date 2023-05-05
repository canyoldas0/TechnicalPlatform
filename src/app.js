const express = require('express');
const secrets = require('../config/secrets');
const router = require('./api/auth/router.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// User model
const User = require('./models/user');

// express app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', router);

const port = process.env.PORT || 8080;

mongoose
  .connect(secrets.dbKey, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
  });

const schema = buildSchema(`
  type Query {
    hello: String
    users: [User]
  }
  
  type Mutation {
    createUser(input: CreateUserInput!): User
  }
  
  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }
  
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
  }
`);

const root = {
  hello: () => {
    return 'Hello world!';
  },
  createUser: async ({ input }) => {
    const { name, email, password } = input;
    const user = new User({ name, email, password });
    await user.save();
    return 'done';
  },
  users: async ({ input }) => {
    const users = await User.find({});
    return users;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log('Server started on port 3000');
});
