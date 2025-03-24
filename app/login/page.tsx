import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogInIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Button } from "../_components/ui/button";

const LoginPage = async () => {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-12 md:grid md:grid-cols-2 md:items-center">
      {/* ESQUERDA - TEXTO */}
      <div className="flex w-full max-w-[550px] flex-col items-center text-center md:mx-auto md:items-start md:text-left">
        <Image
          src="/logo.svg"
          width={173}
          height={39}
          alt="Logo Finance AI"
          className="mb-8"
        />
        <h1 className="mb-3 text-3xl font-bold md:text-4xl">Bem-vindo</h1>
        <p className="mb-8 text-sm text-muted-foreground md:text-base">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <SignInButton>
          <Button variant="outline" className="w-full md:w-auto">
            <LogInIcon className="mr-2" />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>

      {/* DIREITA - IMAGEM (SOMENTE EM TELAS MAIORES) */}
      <div className="relative hidden h-full w-full md:flex md:items-center">
        <Image
          src="/login.png"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
