const express = require("express");
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");

const app = express();

app.use(express.json({ limit: "10kb" }));

app.use(express.urlencoded({ extended: true, limit: "10kb" }));

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
