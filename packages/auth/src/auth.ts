import { db } from "@repo/db";
import * as usersController from "@repo/db/controllers/users.controller";
import * as authSchemas from "@repo/validators/auth.validators";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const authOptions = {
  callbacks: {
    jwt({ token, user, trigger }) {
      if (trigger === "signIn") {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
        };
      } else {
        return token;
      }
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
        },
      };
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials): Promise<User> {
        const { email, password } =
          await authSchemas.login.parseAsync(credentials);
        const user = await usersController.getByEmail(email, db);

        if (!user) {
          throw new Error("User not found.");
        }

        const result = await compare(password, user.password);
        if (!result) {
          throw new Error("User not found.");
        }
        console.log(`${user.firstName} ${user.lastName} has logged in.`);
        return {
          id: user.id.toString(),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
export { type Session } from "next-auth";
