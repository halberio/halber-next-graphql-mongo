import cookie from "cookie";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../mongo/models/User";

export const resolvers = {
  Query: {
    users(_parent: any, _args: any, _context: any, _info: any) {
      const data = User.find();
      return data;
    },
    user(_parent: any, _args: any, _context: any, _info: any) {
      const user = User.findById(_args.id);
      return user;
    },
  },
  Mutation: {
    async signUp(_parent: any, _args: any, _context: any, _info: any) {
      try {
        const existingUser = await User.findOne({ email: _args.input.email });
        if (existingUser) {
          throw new Error("User exists already.");
        }
        const hashedPassword = await bcrypt.hash(_args.input.password, 12);

        const userData = new User({
          email: _args.input.email,
          name: _args.input.name,
          password: hashedPassword,
        });

        const user = await userData.save();

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      } catch (err) {
        throw err;
      }
    },
    async login(_parent: any, _args: any, _context: any, _info: any) {
      const user = await User.findOne({ email: _args.input.email });
      if (!user) {
        throw new Error("User does not exist!");
      }
      const isEqual = await bcrypt.compare(_args.input.password, user.password);
      if (!isEqual) {
        throw new Error("Password is incorrect!");
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        "somesupersecretkey",
        {
          expiresIn: "1h",
        }
      );
      return { userId: user.id, token: token, tokenExpiration: 1 };
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
