import { auth, clerkClient } from "@clerk/nextjs/server";
import { CheckIcon, XIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import { Badge } from "../_components/ui/badge";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { getCurrenceMonthTransactions } from "../_data/get-current-month-transactions";
import AcquirePlanButton from "./_components/acquire-plan-button";

const SubscriptionPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const user = await clerkClient().users.getUser(userId);
  const currentMonthTransactions = await getCurrenceMonthTransactions();
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";
  const hasEssencialPlan = user.publicMetadata.subscriptionPlan === "essencial";
  const hasElitePlan = user.publicMetadata.subscriptionPlan === "elite";
  // const hasFreePlan = user.publicMetadata.subscriptionPlan === null;

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <h1 className="text-center text-2xl font-bold md:text-left">
          Assinatura
        </h1>

        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
          {/* Plano Básico */}
          <Card className="w-full max-w-[450px]">
            <CardHeader className="border-b border-solid py-8">
              {/* {hasFreePlan && (
                <Badge className="absolute left-4 top-12 bg-primary/10 text-primary">
                  Ativo
                </Badge>
              )} */}
              <h2 className="text-center text-2xl font-semibold">
                Plano Básico
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">0</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>
                  Apenas 10 transações por mês ({currentMonthTransactions}/10)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Dashboard financeiro</p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon />
                <p>Relatórios de IA</p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon />
                <p>Relatórios financeiros</p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon />
                <p>Alertas personalizados</p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon />
                <p>Acesso antecipado a novos recursos</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full max-w-[450px]">
            <CardHeader className="relative border-b border-solid py-8">
              {hasEssencialPlan && (
                <Badge className="absolute left-4 top-12 bg-primary/10 text-primary">
                  Ativo
                </Badge>
              )}
              <h2 className="text-center text-2xl font-semibold">
                Plano Essencial
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">19,90</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Dashboard financeiro</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações mensais Ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Relatórios financeiros</p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon />
                <p>Chatbot via WhatsApp</p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon />
                <p>Alertas personalizados</p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon />
                <p>Acesso antecipado a novos recursos</p>
              </div>
              <AcquirePlanButton planType={"essencial"} />
            </CardContent>
          </Card>

          {/* Plano Premium */}
          <Card className="w-full max-w-[450px]">
            <CardHeader className="relative border-b border-solid py-8">
              {hasPremiumPlan && (
                <Badge className="absolute left-4 top-12 bg-primary/10 text-primary">
                  Ativo
                </Badge>
              )}
              <h2 className="text-center text-2xl font-semibold">
                Plano Premium
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">39,90</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Dashboard financeiro</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações mensais ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Relatórios financeiros</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>
                  Chatbot via WhatsApp
                  <span className="font-bold">
                    (limite de 50 transações/mês)
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Alertas personalizados</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Acesso antecipado a novos recursos</p>
              </div>
              <AcquirePlanButton planType={"premium"} />
            </CardContent>
          </Card>

          <Card className="w-full max-w-[450px]">
            <CardHeader className="relative border-b border-solid py-8">
              {hasElitePlan && (
                <Badge className="absolute left-4 top-12 bg-primary/10 text-primary">
                  Ativo
                </Badge>
              )}
              <h2 className="text-center text-2xl font-semibold">
                Plano Elite
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">79,90</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Dashboard financeiro</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações mensais ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>
                  Relatórios financeiros
                  <span className="font-bold">(COM IA AVANÇADA)</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Chatbot via WhatsApp</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Alertas personalizados</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Acesso antecipado a novos recursos</p>
              </div>
              <AcquirePlanButton planType={"elite"} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
