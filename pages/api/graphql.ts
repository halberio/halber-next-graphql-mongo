import { ApolloServer, gql } from "apollo-server-micro";
import Cors from "micro-cors";
import DataLoader from "dataloader";
import Post from "../../mongo-db/models/Post";
import User from "../../mongo-db/models/User";
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/graphql-next-js-db', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("db connected")
});


const typeDefs = gql`    
    type User {
        id: ID!
        name: String!
        posts(first: Int = 25, skip: Int = 0): [Post!]!
    }
    type Post{
        id:ID!,
        name:String!,
        user: User!
    }
    type Query {
        posts(first: Int = 25, skip: Int = 0): [Post!]!
        users(first: Int = 25, skip: Int = 0): [User!]!
    }
    type Mutation {
        createPost(name:String,user_id:String):Post
        createUser(name:String):User
    }
`;

const resolvers = {

    Query: {
        posts : (_parent:any, args:any, _context:any,info:any)=>{
           return  Post.find(function (err:any, posts:any) {
                if (err) return console.error(err);
                console.log(posts);
            })
        },
        users: (_parent:any, args:any, _context:any,info:any)=>{
            return  User.find(function (err:any, posts:any) {
                if (err) return console.error(err);
                console.log(posts);
            })
        },
    },
    Mutation: {
        //@ts-ignore
        createPost:   async (parent:any,args:any,ctx:any,info:any) => {
            const Postdata = new Post({name:args.name, user_id:args.user_id});
            Postdata.save();
              return Postdata;
        },
        createUser:   async (parent:any,args:any,ctx:any,info:any) => {
            const Userdata = new User({name:args.name});
            Userdata.save();
            return Userdata;
        }

    },
    Post: {
        id: (post:any, _args:any, _context:any) => post.id,
        user: (post:any, _args:any, { loader }:any) => {
            return loader.post.load(post.user_id);
        }
    },

    User: {
        id: (user:any, _args:any, _context:any) => user.id,
        posts: (user:any, args:any, _context:any) => {
            return  Post.find(function (err:any, posts:any) {
                if (err) return console.error(err);
                console.log(posts);
            }).where("user_id").equals(user.id).limit(Math.min(args.first, 50));
        }
    }
};

const loader = {

    post: new DataLoader(ids =>
       Post.find((rows:any) => ids.map(id => rows.find((row:any) => row.id === id)))
    )

};

const cors = Cors({
    allowMethods: ["GET", "POST", "OPTIONS"]
});

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        return { loader };
    }
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
    api: {
        bodyParser: false
    }
};

export default cors(handler);