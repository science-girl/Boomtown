const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const schema = require("./api/schema");

const GQL_PORT = process.env.PORT; // this is defined in package.json

const app = express();
app.use("*", cors());

// 2 ENDPOINTS: /graphql and /graphipl

// Where we will send all of our GraphQL requests
// any access to /graphql, parse into JSON and pass to graphqlExpress
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// A route for accessing the GraphiQL tool
// passes to Middleware
app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);
app.listen(GQL_PORT, () =>
  console.log(`GraphQL is now running on http://localhost:${GQL_PORT}/graphql`)
);
