import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { signInSchema } from "./zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        let user = null;

        user = {
          id: "1",
          name: "Aung",
          email: "email@mail.com",
        };

        const parsedCredentials = signInSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          console.error("Invalid credentials:", parsedCredentials.error.errors);
          return null;
        }

        if (!user) {
          console.log("Invalid credentials!");
          return null;
        }

        return user;
      },
    }),
    Google,
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      if (pathname.startsWith("/signin") && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return !!auth;
    },
    // jwt({ token, user }) {
    //   if (user) {
    //     token.id = user.id as string;
    //   }
    //   return token;
    // },
    // session({ session, token }) {
    //   session.user.id = token.id;
    //   return session;
    // },
  },
});
