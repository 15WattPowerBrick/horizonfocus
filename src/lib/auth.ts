import NextAuth, { CredentialsSignin } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        throw new InvalidLoginError()
      },
    }),
    Google
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'database',
  },
})