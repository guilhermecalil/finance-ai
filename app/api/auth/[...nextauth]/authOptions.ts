import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub!;
      session.user.subscriptionPlan = token.subscriptionPlan ?? "free";
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.subscriptionPlan = "premium"; // ou buscar do banco
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};
