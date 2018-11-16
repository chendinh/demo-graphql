const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schemaEvent");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// allow cross-origin requests
app.use(cors());
// connect to mlab database
mongoose.connect("mongodb://admin:admin123@ds259253.mlab.com:59253/event-graphql")

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connect success");
});
// set port
app.set("port", (process.env.PORT || 4000));
// bind express with graphql
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); 
});
