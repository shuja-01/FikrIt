import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/core/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "jwt"
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
        }
      },
      checks: ["none"],
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.isApproved = (user as any).isApproved;
        token.id = user.id;
        token.phone = (user as any).phone;
        token.gender = (user as any).gender;
        token.marjae = (user as any).marjae;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.role = token.role as string;
        session.user.isApproved = token.isApproved as boolean;
        session.user.id = token.id as string;
        session.user.phone = token.phone as string;
        session.user.gender = token.gender as string;
        session.user.marjae = token.marjae as string;
      }
      return session;
    }
  }
})
