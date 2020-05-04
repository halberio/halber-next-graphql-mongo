import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../graphql/schema";
import Cors from "micro-cors";
let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/graphql-next-js-db", {
  useNewUrlParser: true,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("db connected");
});

const apolloServer = new ApolloServer({
  schema,
  context(ctx) {
    return ctx;
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["GET", "POST", "OPTIONS"],
});

export default cors(apolloServer.createHandler({ path: "/api/graphql" }));
