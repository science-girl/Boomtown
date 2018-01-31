const DataLoader = require("dataloader");
const express = require("express");
const cors = require("cors");
const createLoaders = require("./api/loaders");

const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = require("./api/schema");

const config = require("./config");
const initResolvers = require("./api/resolvers");

const app = express();
config(app);

let js = require("./api/resources/jsonResource")(app);
let postgresResource = require("./api/resources/postgresResource");
//let firebaseResource = require("./api/resources/firebaseResource");

postgresResource(app).then(pgresource => start(pgresource));

function start(postgresResource) {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: initResolvers({
      js,
      postgresResource
    })
  });

  // this is used for cross-origin purposes; we will (post-dev) determine a
  // white list for domains that can access our domain for security
  app.use("*", cors());

  // 2 ENDPOINTS: /graphql and /graphipl

  // Where we will send all of our GraphQL requests
  // any access to /graphql, parse into JSON and pass to graphqlExpress
  app.use(
    "/graphql",
    bodyParser.json(),
    graphqlExpress({
      schema,
      context: { loaders: createLoaders({ js, postgresResource }) }
    })
  );

  // A route for accessing the GraphiQL tool
  // passes to Middleware
  app.use(
    "/graphiql",
    graphiqlExpress({
      endpointURL: "/graphql"
    })
  );
  app.listen(app.get("PORT"), () =>
    console.log(
      `GraphQL is now running on http://localhost:${app.get("PORT")}/graphql`
    )
  );
}
