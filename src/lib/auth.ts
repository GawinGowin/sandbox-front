import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// セッション情報を取得するヘルパー関数
export async function getSession() {
  return await getServerSession(authOptions);
}

// 現在のユーザーを取得するヘルパー関数
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

// NextAuthセッションユーザー型の拡張（必要に応じて）
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string;
  }
}
