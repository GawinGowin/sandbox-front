"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function AuthStatus() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (!session) {
    return (
      <Link href="/login" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        ログイン
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        {session.user?.image && (
          <img
            src={session.user.image}
            alt={session.user.name || "Profile"}
            className="h-8 w-8 rounded-full"
          />
        )}
        <span>{session.user?.name || "ユーザー"}</span>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        ログアウト
      </button>
    </div>
  );
}
