import { AuthenticationError, UserInputError } from "apollo-server-micro";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import getConfig from "next/config";
import bcrypt from "bcrypt";
import { v4 } from "uuid";

const JWT_SECRET = getConfig().serverRuntimeConfig.JWT_SECRET;

const users: any = [];

function createUser(data: any) {
  const salt = bcrypt.genSaltSync();

  return {
    id: v4(),
    email: data.email,
    hashedPassword: bcrypt.hashSync(data.password, salt),
  };
}



function validPassword(user: any, password: any) {
  return bcrypt.compareSync(password, user.hashedPassword);
}

export const resolvers = {
  Query: {
    async viewer(_parent: any, _args: any, context: any, _info: any) {
      const { token } = cookie.parse(context.req.headers.cookie ?? "");
      if (token) {
        try {
          const { id, email }: any = jwt.verify(token, JWT_SECRET);

          return users.find(
            (user: any) => user.id === id && user.email === email
          );
        } catch {
          throw new AuthenticationError(
            "Authentication token is invalid, please log in"
          );
        }
      }
    },

  },
  Mutation: {

    async signUp(_parent: any, _args: any, _context: any, _info: any) {
      const user = createUser(_args.input);

      users.push(user);

      return { user };
    },
    async signIn(_parent: any, _args: any, _context: any, _info: any) {
      const user = users.find((user: any) => user.email === _args.input.email);

      if (user && validPassword(user, _args.input.password)) {
        const token = jwt.sign(
          { email: user.email, id: user.id, time: new Date() },
          JWT_SECRET,
          {
            expiresIn: "6h",
          }
        );

        _context.res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
            httpOnly: true,
            maxAge: 6 * 60 * 60,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
          })
        );

        return { user };
      }

      throw new UserInputError("Invalid email and password combination");
    },
    async signOut(_parent: any, _args: any, _context: any, _info: any) {
      _context.res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", {
          httpOnly: true,
          maxAge: -1,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
      );

      return true;
    },

  },
};
