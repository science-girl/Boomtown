module.exports = app => {
  // Postgress config
  app.set("PGUSER", process.env.PGUSER || "boomtowndb");
  app.set("PGPASSWORD", process.env.PGPASSWORD || "boomtowndb");
  app.set("PGDATABASE", process.env.PGDATABASE || "boomtowndb");
  app.set("PGHOST", process.env.PGHOST || "localhost");
  app.set("PGPORT", process.env.PG_PORT || "5432");

  // GraphQL config
  //  app.set("GQL_PORT", process.env.GQL_PORT || "3002");
  // Express config (GraphQL included)
  app.set("PORT", process.env.PORT || "3002");
  // Temporary
  app.set("JSON_PORT", "3001");

  // Initialize firebase app
  app.set("FIREBASE_CONFIG", {
    apiKey: "AIzaSyB6fGRLoBax-WChiJF-893mOj60k7dklbE",
    authDomain: "boomtown-e933c.firebaseapp.com",
    databaseURL: "https://boomtown-e933c.firebaseio.com",
    projectId: "boomtown-e933c",
    storageBucket: "boomtown-e933c.appspot.com",
    messagingSenderId: "858540313336"
  });
};
