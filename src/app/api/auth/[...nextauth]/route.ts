import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // 初回サインイン時にユーザー情報をトークンに保存
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      // OAuthのアクセストークンを保存（必要な場合）
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        // すでにsession.user.nameとsession.user.emailはOAuthプロバイダから取得しているので
        // ここでは上書きしません（必要な場合のみ上書き）
        
        // カスタムプロパティを追加する場合は型拡張が必要です
        // @ts-ignore - カスタムフィールドを追加
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  // セキュリティ設定（オプション）
  secret: process.env.NEXTAUTH_SECRET || "your-secret-value",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
