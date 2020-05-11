import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import { typeDefs } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolvers";
import { makeExecutableSchema } from 'graphql-tools'
let mongoose = require("mongoose");
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
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
    return ctx
  },
})


export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["GET", "POST", "OPTIONS"],
});

const withApolloServer = apolloServer.createHandler({ path: "/api/graphql" } );

const withCorsApollo = cors(withApolloServer);

export default withCorsApollo;
