import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import passport from "passport";
import { GraphQLLocalStrategy, buildContext } from "graphql-passport";
import { typeDefs } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolvers";
import User from "../../mongo/models/User";
let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/graphql-next-js-db", {
  useNewUrlParser: true,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("db connected");
});
passport.use(
  new GraphQLLocalStrategy((email: any, _password: any, done: any) => {
    const matchingUser = User.find({ email, _password });
    const error = matchingUser ? null : new Error("no matching user");
    done(error, matchingUser);
  })
);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => buildContext({ req, res, User }),
});



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
