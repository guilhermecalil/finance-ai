"use client";

import { useSession, signOut } from "next-auth/react";

export default function AccountPage() {
  const { data: session } = useSession();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Minha Conta</h1>
      <p>Nome: {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-4 rounded bg-black px-4 py-2 text-white"
      >
        Sair
      </button>
    </div>
  );
}
