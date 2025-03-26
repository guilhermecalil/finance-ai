"use server";

import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { GenerateAiReportSchema, generateAiReportSchema } from "./schema";

const DUMMY_REPORT =
  '### Relatório de Finanças Pessoais\n\n#### Resumo Geral das Finanças\nAs transações listadas foram analisadas e as seguintes informações foram extraídas para oferecer insights sobre suas finanças:\n\n- **Total de despesas:** R$ 19.497,56\n- **Total de investimentos:** R$ 14.141,47\n- **Total de depósitos/correntes:** R$ 10.100,00 (considerando depósitos de salário e outros)\n- **Categoria de maior despesa:** Alimentação\n\n#### Análise por Categoria\n\n1. **Alimentação:** R$ 853,76\n2. **Transporte:** R$ 144,05\n3. **Entretenimento:** R$ 143,94\n4. **Outras despesas:** R$ 17.828,28 (inclui categorias como saúde, educação, habitação)\n\n#### Tendências e Insights\n- **Despesas Elevadas em Alimentação:** A categoria de alimentação representa uma parte significativa de suas despesas, com um total de R$ 853,76 nos últimos meses. É importante monitorar essa categoria para buscar economia.\n  \n- **Despesas Variáveis:** Outros tipos de despesas, como entretenimento e transporte, também se acumulam ao longo do mês. Identificar dias em que se gasta mais pode ajudar a diminuir esses custos.\n  \n- **Investimentos:** Você fez investimentos significativos na ordem de R$ 14.141,47. Isso é um bom sinal para a construção de patrimônio e aumento de sua segurança financeira no futuro.\n  \n- **Categorização das Despesas:** Há uma série de despesas listadas como "OUTRA", que podem ser reavaliadas. Classificar essas despesas pode ajudar a ter um controle melhor das finanças.\n\n#### Dicas para Melhorar Sua Vida Financeira\n\n1. **Crie um Orçamento Mensal:** Defina um limite de gastos para cada categoria. Isso ajuda a evitar gastos excessivos em áreas como alimentação e entretenimento.\n\n2. **Reduza Gastos com Alimentação:** Considere cozinhar em casa com mais frequência, planejar refeições e usar listas de compras para evitar compras impulsivas.\n\n3. **Revise Despesas Recorrentes:** Dê uma olhada nas suas despesas fixas (como saúde e educação) para verificar se estão adequadas às suas necessidades e se há espaço para redução.\n\n4. **Estabeleça Metas de Poupança:** Com base em seus depósitos e investimentos, estabeleça metas específicas para economizar uma porcentagem do seu rendimento mensal. Estimar quanto você pode economizar pode ajudar a garantir uma reserva de emergência.\n\n5. **Diminua os Gastos com Entretenimento:** Planeje lazer de forma que não exceda seu orçamento, busque opções gratuitas ou de baixo custo. Lembre-se de que entretenimento também pode ser feito em casa.\n\n6. **Reavalie Seus Investimentos:** Certifique-se de que seus investimentos estejam alinhados com seus objetivos financeiros a curto e longo prazo. Pesquise alternativas que podem oferecer melhor retorno.\n\n7. **Acompanhe Suas Finanças Regularmente:** Use aplicativos de gerenciamento financeiro para controlar suas despesas e receitas, ajudando você a manter-se informado sobre sua saúde financeira.\n\n#### Conclusão\nMelhorar sua vida financeira é um processo contínuo que envolve planejamento, monitoramento e ajustes regulares. Com as análises e as sugestões acima, você pode começar a tomar decisões financeiras mais estratégicas para alcançar seus objetivos. Lembre-se que cada real economizado é um passo a mais em direção à segurança financeira!';

export const generateAiReport = async ({ month }: GenerateAiReportSchema) => {
  generateAiReportSchema.parse({ month });

  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado!");
  }

  const user = await clerkClient().users.getUser(userId);

  // Garantir que publicMetadata e subscriptionPlan estejam presentes e são strings
  const subscriptionPlan = user.publicMetadata?.subscriptionPlan;

  // Verificar se subscriptionPlan é uma string válida e pertence aos planos esperados
  if (
    typeof subscriptionPlan !== "string" ||
    !["elite", "premium", "essencial"].includes(subscriptionPlan)
  ) {
    throw new Error(
      "Você precisa de um plano pago (Essencial, Premium ou Elite) para gerar relatórios IA.",
    );
  }

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
        gte: new Date(new Date().getFullYear(), parseInt(month) - 1, 1), // Converte o mês para número
        lt: new Date(new Date().getFullYear(), parseInt(month), 1), // Converte o mês para número
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
    model: "gpt-4o-mini",
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
