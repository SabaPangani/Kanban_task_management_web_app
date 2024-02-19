import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, token, user }) => {
      if (session.user !== undefined) {
        (session.user.id as unknown) = token.uid || "";
        session.user.name = token.name || "";
        session.user.lastName = token.lastName || "";
        return session;
      }
    },

    jwt: async ({ user, token, trigger, session }) => {
      if (user) {
        token.uid = user.id;
        token.lastName = user.lastName;

        user.id && (token.id = user.id);
        user.lastName && (token.lastName = user.lastName);
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  adapter: PrismaAdapter(prisma as any),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
