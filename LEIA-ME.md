# Simulados da turma — manual

## Os arquivos

```
index.html            o site.
config.js             configuração pública do Supabase.
catalogo.js           a lista de simulados.
supabase.sql          o código do banco de dados.
perguntas/            uma pasta com um arquivo por simulado.
  geo-3ano-ago26.js
  geo-4ano-ago26.js
  port-3ano-ago26.js
  port-4ano-ago26.js
tests/                validações automáticas do catálogo e das questões.
```

A ideia é simples: o `catalogo.js` diz **quais simulados existem**, e cada arquivo dentro de `perguntas/` guarda **as perguntas de um simulado só**.

---

## Como o site vai para o ar

O GitHub é a fonte principal do projeto e está conectado à Vercel.

- Cada branch enviada ao GitHub gera uma versão de teste na Vercel.
- Alterações enviadas para `main` atualizam a produção.
- Antes de trabalhar pelo VS Code, execute `git pull origin main` para não editar uma cópia antiga.
- Prefira revisar a versão de teste antes de juntar uma branch à `main`.

---

## Como incluir uma prova nova

O caminho normal é pedir aqui, com o Claude aberto no VS Code: diga a matéria, a turma e mande as perguntas — digitadas, em foto do caderno, em PDF, do jeito que estiverem. Ele cria o arquivo em `perguntas/`, registra no `catalogo.js`, confere e publica.

O resto desta seção é para quando você quiser fazer à mão. São dois passos.

**1. Criar o arquivo das perguntas.**

Crie o arquivo dentro da pasta `perguntas/`, seguindo o padrão de nome:

```
perguntas/mat-3ano-set26.js
```

Cole as perguntas no mesmo formato dos arquivos que já existem — abra um deles para copiar o modelo. A primeira linha precisa ter o mesmo id do catálogo:

```js
registrarPerguntas("mat-3ano-set26", [
  {
    p: "O texto da pergunta?",
    alt: ["Primeira", "Segunda", "Terceira", "Quarta"],
    correta: 2,        // 0 = primeira, 1 = segunda, 2 = terceira, 3 = quarta
  },
]);
```

Cuidados: manter as **aspas**, a **vírgula no fim de cada linha** e sempre **quatro** alternativas.

**2. Registrar no catálogo.**

Abra o `catalogo.js`, copie o modelo que está comentado no fim do arquivo e preencha:

```js
{
  id: "mat-3ano-set26",
  materia: "Matemática",
  titulo: "Multiplicação e divisão",
  turma: "3º ano",
  cor: "verde",
  arquivo: "perguntas/mat-3ano-set26.js",
  ativo: true,
},
```

Salve o arquivo em uma branch, envie ao GitHub e confira a versão de teste criada pela Vercel. Depois da aprovação, junte a branch à `main` para publicar.

### O padrão dos nomes

`materia-ano-mesano` → `geo-3ano-ago26`, `ing-4ano-set26`, `port-3ano-out26`.

O **id** e o **nome do arquivo** devem combinar. E o id é o que amarra o ranking: depois que um simulado for publicado, **nunca mude o id dele**, senão as notas já registradas somem da lista.

### As cores

Verde é do 3º ano (Giovanna), roxo é do 4º ano (Antonella). O site troca o tema sozinho conforme o simulado escolhido.

---

## Provas que já passaram

No `catalogo.js`, troque `ativo: true` por `ativo: false` — ou peça aqui, que é mais rápido.

O simulado sai do topo e desce para a seção **Provas anteriores**, que fica fechadinha no fim da lista. Ele continua funcionando e o ranking continua salvo — serve como revisão para a prova final ou para a recuperação.

---

## Mandar o link de uma prova específica

O endereço do site abre o menu com todos os simulados. Mas você pode mandar no grupo o link direto de um deles: é só acrescentar `?q=` e o id no fim.

```
simulado-da-turma.vercel.app/?q=geo-3ano-ago26
simulado-da-turma.vercel.app/?q=geo-4ano-ago26
simulado-da-turma.vercel.app/?q=port-3ano-ago26
simulado-da-turma.vercel.app/?q=port-4ano-ago26
```

Quem abrir esse link já cai na tela certa, com o simulado selecionado — sem risco de clicar no errado. Tem um "Ver todos os simulados" logo abaixo para quem quiser os outros.

---

## O ranking (Supabase)

**Uma vez só, no começo:** entre no [supabase.com](https://supabase.com), abra seu projeto, vá em **SQL Editor → New query**, cole todo o conteúdo do `supabase.sql` e clique em **Run**. Deve aparecer "Success".

**As duas chaves do `config.js`:** em **Settings → API**:

- `SUPABASE_URL` → o **Project URL**. Sempre começa com `https://` e termina com `.supabase.co`.
- `SUPABASE_ANON_KEY` → a chave **publishable** (começa com `sb_publishable_`).

> Não troque a ordem: se a chave for parar no campo da URL, o site funciona mas o ranking não salva nada.
> A chave publishable é pública de propósito, pode ficar no site. A **secret** / **service_role** nunca.

**Cada simulado tem seu próprio ranking**, separado por id. Geografia de agosto não mistura com Ciências de setembro.

Mostra os 20 melhores, guardando só o melhor resultado de cada nome. Critério: mais acertos ganha; empatou, ganha quem foi mais rápido. Os três primeiros aparecem com medalha, e quem ficou fora dos 20 ainda vê a própria posição no fim da lista.

Para consultar quando quiser: **Ver o ranking**, na primeira tela, sem precisar jogar. Lá dentro, as abas no topo trocam de simulado — dá para conferir o 3º e o 4º ano na mesma tela.

**Para apagar um resultado** (nome inadequado, teste seu, etc.): Supabase → **Table Editor → placar** → seleciona a linha → Delete.

---

## Coisas boas de saber

**Sobre os nomes.** O quiz pede só o primeiro nome, sem e-mail nem qualquer outro dado. Como o link é público e são crianças, vale combinar com a turma: primeiro nome ou apelido, nada além disso.

**Sobre trapaça.** Um aluno mais curioso conseguiria ver as respostas certas no código-fonte da página ou mandar uma nota falsa. Para um quiz de estudo da turma isso não costuma ser problema, mas é bom você saber que existe.

**No fim da prova, dá para revisar.** A tela do resultado traz as perguntas erradas, com o que a criança marcou e qual era a certa. É a parte que faz o simulado virar estudo, e não só nota.

**Ninguém perde a partida no meio.** O progresso fica guardado por 6 horas no próprio aparelho: se fechar o site, cair a internet ou chegar uma mensagem, ao voltar aparece "Continuar de onde parei", com o placar e o tempo certos. O relógio não corre enquanto o site está fechado. Também dá para sair do simulado a qualquer momento, com confirmação, sem precisar recarregar a página.

**O nome fica guardado** no aparelho, então não precisa digitar de novo a cada partida.

**Embaralhamento.** As perguntas e as alternativas trocam de ordem a cada partida, então ninguém decora "é sempre a letra B" — e todo mundo responde às mesmas perguntas, o que mantém o ranking justo.

**Custo.** Zero. Só uma atenção: o Supabase pausa projetos gratuitos sem acesso por cerca de uma semana — se o ranking parar de carregar, é só entrar no painel e reativar.

**Testar antes de publicar.** Dá para abrir o `index.html` com dois cliques no seu computador e conferir se está tudo certo, sem precisar subir nada.
