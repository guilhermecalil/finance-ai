"use server";

import { db } from "@/app/_lib/prisma";
import OpenAI from "openai";
import { GenerateAiReportSchema, generateAiReportSchema } from "./schema";

// 🔁 Aqui você deve substituir por sua lógica de autenticação real
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // ajuste para onde está seu config
import { getServerSession } from "next-auth";
// OU implemente algo como: import { auth } from "@/lib/auth"; se for algo customizado

const DUMMY_REPORT = `### Relatório de Finanças Pessoais

#### Resumo Geral das Finanças
As transações listadas foram analisadas e as seguintes informações foram extraídas para oferecer insights sobre suas finanças:

- **Total de despesas:** R$ 19.497,56
- **Total de investimentos:** R$ 14.141,47
- **Total de depósitos/correntes:** R$ 10.100,00 (considerando depósitos de salário e outros)
- **Categoria de maior despesa:** Alimentação

#### Análise por Categoria
1. **Alimentação:** R$ 853,76
2. **Transporte:** R$ 144,05
3. **Entretenimento:** R$ 143,94
4. **Outras despesas:** R$ 17.828,28 (inclui categorias como saúde, educação, habitação)

#### Tendências e Insights
- **Despesas Elevadas em Alimentação:** A categoria de alimentação representa uma parte significativa de suas despesas, com um total de R$ 853,76 nos últimos meses.
- **Despesas Variáveis:** Entretenimento e transporte acumulam ao longo do mês.
- **Investimentos:** R$ 14.141,47 é um bom indicador para construção de patrimônio.
- **Categorização das Despesas:** Despesas listadas como "OUTRA" devem ser reavaliadas.

#### Dicas para Melhorar Sua Vida Financeira
1. Crie um orçamento mensal.
2. Reduza gastos com alimentação.
3. Revise despesas recorrentes.
4. Estabeleça metas de poupança.
5. Diminua os gastos com entretenimento.
6. Reavalie seus investimentos.
7. Acompanhe suas finanças regularmente.

#### Conclusão
Melhorar sua vida financeira é um processo contínuo. Cada real economizado é um passo rumo à segurança financeira!
`;

export const generateAiReport = async ({ month }: GenerateAiReportSchema) => {
  generateAiReportSchema.parse({ month });

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("Usuário não autenticado!");
  }

  const subscriptionPlan = session.user.subscriptionPlan;

  // Você pode ajustar isso para vir do banco de dados ou session.user diretamente
  if (
    typeof subscriptionPlan !== "string" ||
    !["elite", "premium", "essencial"].includes(subscriptionPlan)
  ) {
    throw new Error(
      "Você precisa de um plano pago (Essencial, Premium ou Elite) para gerar relatórios IA.",
    );
  }

  // Fallback se não tiver OpenAI KEY
  if (!process.env.OPENAI_API_KEY) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return DUMMY_REPORT;
  }

  const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(new Date().getFullYear(), parseInt(month) - 1, 1),
        lt: new Date(new Date().getFullYear(), parseInt(month), 1),
      },
    },
  });

  const basePrompt = `Gere um relatório com insights sobre as minhas finanças. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
${transactions
  .map(
    (transaction) =>
      `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`,
  )
  .join(";")}`;

  let promptDetails = "";

  switch (subscriptionPlan) {
    case "elite":
      promptDetails =
        "Inclua um resumo detalhado, insights personalizados e sugestões estratégicas.";
      break;
    case "premium":
      promptDetails = "Forneça insights financeiros e sugestões de economia.";
      break;
    case "essencial":
      promptDetails =
        "Forneça um resumo financeiro simples sem insights detalhados.";
      break;
  }

  const completion = await openAi.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "Você é um especialista em finanças pessoais, ajudando a organizar e melhorar a vida financeira das pessoas.",
      },
      {
        role: "user",
        content: `${basePrompt}\n\n${promptDetails}`,
      },
    ],
  });

  return completion.choices[0].message.content;
};
