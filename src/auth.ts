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
  cookies: {
    sessionToken: {
      name: `__Secure-authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
        domain: "fikrit.co", // Explicitly bind cookies to your domain
      },
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      checks: ["none"], 
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
