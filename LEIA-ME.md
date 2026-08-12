# Quiz de Geografia — como colocar no ar

Quatro arquivos, três passos. Não precisa instalar nada no computador.

```
index.html     o site (não precisa mexer)
config.js      onde você cola os dados do Supabase
perguntas.js   as perguntas (mexa aqui para trocar/adicionar)
supabase.sql   o código do banco de dados
```

---

## Passo 1 — Criar a tabela no Supabase

1. Entre no [supabase.com](https://supabase.com) e abra seu projeto (ou crie um novo, região **South America (São Paulo)**).
2. No menu da esquerda, clique em **SQL Editor** → **New query**.
3. Abra o arquivo `supabase.sql`, copie **tudo** e cole na janela.
4. Clique em **Run**. Deve aparecer "Success".

Isso cria a tabela `placar` e liga a segurança: qualquer um pode jogar e ver o ranking, mas **ninguém consegue apagar ou alterar as notas** pelo site. Só você, logada no painel.

## Passo 2 — Pegar as duas chaves

1. Ainda no Supabase: **Settings** (engrenagem) → **API**.
2. Copie o **Project URL** (algo como `https://xxxxxxxx.supabase.co`).
3. Copie a chave **anon public**.
4. Abra o `config.js` e cole as duas nos lugares indicados. Salve.

> A chave `anon` é pública de propósito — ela pode ficar no site. A que **nunca** pode aparecer é a `service_role`. Não use essa.

## Passo 3 — Publicar na Vercel

**Jeito mais rápido (sem GitHub):**

1. Coloque os quatro arquivos numa pasta.
2. Entre em [vercel.com](https://vercel.com) → **Add New** → **Project** → **Deploy** e arraste a pasta.
3. Pronto, o site já está no ar.

**Jeito melhor a longo prazo (com GitHub):** suba a pasta para um repositório no GitHub e conecte na Vercel. Assim, toda vez que você editar uma pergunta, o site se atualiza sozinho.

---

## A URL personalizada

**Opção A — grátis.** A Vercel te dá um endereço `.vercel.app` e você escolhe o começo dele. Em **Settings → General → Project Name**, mude o nome do projeto para o que quiser:

```
quiz-geografia-3ano.vercel.app
simuladodaturma.vercel.app
```

Se o nome já estiver em uso, ela avisa e você tenta outro. É o suficiente para mandar no grupo da turma.

**Opção B — domínio próprio (pago).** Se quiser algo como `quizdageo.com.br`:

1. Compre o domínio no [registro.br](https://registro.br) (`.com.br` custa cerca de R$ 40/ano) ou em qualquer registrador.
2. Na Vercel: **Settings → Domains → Add**, digite o domínio.
3. A Vercel mostra os registros de DNS para copiar no painel do registro.br. Leva de minutos a algumas horas para propagar.
4. O certificado de segurança (HTTPS) a Vercel emite sozinha, de graça.

---

## Trocando as perguntas

Abra o `perguntas.js`. Cada pergunta é assim:

```js
{
  p: "O texto da pergunta?",
  alt: ["Primeira", "Segunda", "Terceira", "Quarta"],
  correta: 2,          // 0 = primeira, 1 = segunda, 2 = terceira, 3 = quarta
},
```

Cuidado só com isto: manter as **aspas**, a **vírgula no final** e sempre **quatro** alternativas.

O site embaralha as perguntas e as alternativas a cada partida, então ninguém decora "é sempre a letra B" — e todo mundo responde às mesmas 20 perguntas, o que mantém o ranking justo.

---

## Coisas boas de saber

**Sobre os nomes.** O quiz pede só o primeiro nome, sem e-mail nem qualquer outro dado. Como o link é público e são crianças, vale combinar com a turma: primeiro nome ou apelido, nada além disso. Se aparecer algum nome inadequado no ranking, você apaga direto no Supabase (**Table Editor → placar**, seleciona a linha, Delete).

**Sobre trapaça.** Um aluno mais curioso conseguiria ver as respostas certas no código-fonte da página ou mandar uma nota falsa. Para um quiz de estudo da turma isso não costuma ser problema, mas é bom você saber que existe. Se um dia virar competição séria, dá para esconder o gabarito no servidor — me chame que eu ajusto.

**Ranking.** Mostra os 20 melhores de cada turma, guardando só o melhor resultado de cada nome. Critério: mais acertos ganha; em caso de empate, o mais rápido.

**Custo.** Zero. Os planos gratuitos da Vercel e do Supabase sobram para uma turma inteira. Só uma atenção: o Supabase pausa projetos gratuitos sem acesso por cerca de uma semana — se o ranking parar de carregar, é só entrar no painel e reativar.
