import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      isApproved: boolean;
      phone: string | null;
      gender: string | null;
      marjae: string | null;
    } & DefaultSession["user"]
  }

  interface User {
    role: string;
    isApproved: boolean;
    phone: string | null;
    gender: string | null;
    marjae: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    isApproved: boolean;
    phone: string | null;
    gender: string | null;
    marjae: string | null;
  }
}
