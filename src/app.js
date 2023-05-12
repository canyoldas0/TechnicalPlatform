import { config } from '../config/secrets.js';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';

import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './Schemas/schema.js';
import resolvers from './Schemas/resolvers.js';

import express from 'express';
import mongoose from 'mongoose';

// User model
// import User = require('./models/user');

// express app
const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // needed?
app.use(bodyParser.json()); // needed?

const port = process.env.PORT || 8080;

mongoose
  .connect(config.dbKey, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
  });

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log('Server started on port 3000');
});
