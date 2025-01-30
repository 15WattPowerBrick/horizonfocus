import NextAuth from "next-auth";
import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { signInSchema } from "./zod";
import bcrypt from "bcryptjs";
import { GoogleProfile } from "next-auth/providers/google";

const adapter = PrismaAdapter(prisma);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  session: {
    strategy: "database",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedCredentials = signInSchema.parse(credentials);

        const user = await prisma.user.findFirst({
          where: {
            email: validatedCredentials.email.toLowerCase(),
          },
        });

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        //Compare the provided password with the stored hash
        const isPasswordValid = await bcrypt.compare(
          validatedCredentials.password,
          user.password as string
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials.");
        }

        return user;
      },
    }),
    Google({
      profile: (_profile: GoogleProfile) => {
        return {
          id: _profile.sub,
          firstName: _profile.given_name,
          lastName: _profile.family_name,
          email: _profile.email,
          image: _profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
});
