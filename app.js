const express = require("express");
const dotenv = require("dotenv");

const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

// app.use(express.static(path.join(__dirname, "public")));

// solving CORS issue
// app.use(
//   cors({
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   })
// );

app.use(express.json({ limit: "10kb" }));

app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// checking req.query middleware
app.use(function (req, res, next) {
  console.log("Query:", req.query);
  console.log("Params:", req.params);
  console.log("Body:", req.body);
  next();
});

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);

const client = new MongoClient(DB, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("sample_analytics").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
