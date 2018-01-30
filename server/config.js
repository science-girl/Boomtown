module.exports = app => {
  // Postgress config
  app.set("PGUSER", process.env.PGUSER || "boomtowndb");
  app.set("PGPASSWORD", process.env.PGPASSWORD || "boomtowndb");
  app.set("PGDATABASE", process.env.PGDATABASE || "boomtowndb");
  app.set("PGHOST", process.env.PGHOST || "localhost");
  app.set("PG_PORT", process.env.PG_PORT || "5432");

  // GraphQL config
  //  app.set("GQL_PORT", process.env.GQL_PORT || "3002");
  // Express config (GraphQL included)
  app.set("PORT", process.env.PORT || "3002");
  // Temporary
  app.set("JSON_PORT", "3001");
};
