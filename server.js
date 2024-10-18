const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const { createHandler } = require('graphql-http/lib/use/express');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const db = require('./db/models');
const isAuth = require('./middleware/is_auth');
const app = express();


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);


app.use(
  '/graphql',
  createHandler({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    context: (req, res) => ({ req, res }),
    // context: ({ req }) => ({ req }),
  })
);


db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/graphql`);
  });
});
