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
      checks: ["none"], // Disabling PKCE checks as a temporary fix for Vercel/Custom Domain cookie sync issues
    })
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.role = (user as any).role;
        session.user.isApproved = (user as any).isApproved;
        session.user.id = user.id;
      }
      return session;
    }
  }
})
