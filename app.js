const express = require("express");
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");

const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./helpers/isAuth");

const app = express();

app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

// app.use((req, res, next) => {
//   console.log(req);
//   next();
// });

app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    // routes
    schema: graphqlSchema,
    // controller || logic
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    // some options
    dbName: "graphQL",
  })
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log("Connection ERROR💥:", err));

app.listen(3000);
