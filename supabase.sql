-- ============================================================
--  TABELA DO RANKING
--  Cole tudo isto no Supabase > SQL Editor > New query > Run.
--  Pode rodar mais de uma vez sem medo: nao apaga nada do que ja existe.
-- ============================================================

create table if not exists public.placar (
  id         bigint generated always as identity primary key,
  criado_em  timestamptz not null default now(),
  nome       text    not null check (char_length(nome) between 1 and 18),
  quiz       text    not null,
  acertos    integer not null check (acertos >= 0),
  total      integer not null check (total > 0),
  segundos   integer not null check (segundos > 0)
);

-- deixa a busca do ranking rapida
create index if not exists placar_quiz_idx
  on public.placar (quiz, acertos desc, segundos asc);

-- liga a seguranca por linha
alter table public.placar enable row level security;

-- qualquer visitante pode VER o ranking
drop policy if exists "ranking visivel para todos" on public.placar;
create policy "ranking visivel para todos"
  on public.placar for select
  to anon
  using (true);

-- qualquer visitante pode REGISTRAR a propria nota
drop policy if exists "qualquer um pode registrar nota" on public.placar;
create policy "qualquer um pode registrar nota"
  on public.placar for insert
  to anon
  with check (true);

-- ninguem consegue alterar nem apagar notas pelo site.
-- Isso so acontece por aqui, no painel do Supabase (Table Editor > placar).


-- ============================================================
--  REPARO DE TABELAS ANTIGAS
--
--  A primeira versao deste projeto so aceitava quiz = '3ano' ou '4ano'.
--  Como o comando la em cima e "create table IF NOT EXISTS", ele nao
--  altera uma tabela que ja existe -- entao aquela regra velha continuava
--  recusando os ids de hoje (geo-3ano-ago26) e NENHUMA nota era salva.
--
--  As linhas abaixo tiram essa trava. Em banco novo elas nao fazem nada.
-- ============================================================

alter table public.placar drop constraint if exists placar_quiz_check;

-- garante o resto do formato atual, caso a tabela venha da versao antiga
alter table public.placar alter column quiz type text;


-- ============================================================
--  REGRAS CONTRA BAGUNCA NO RANKING
--
--  O site nao tem senha: qualquer um que abra o link pode registrar
--  uma nota, e e assim que ele funciona. O que da para fazer e recusar
--  no proprio banco aquilo que nao pode ser resultado de uma partida:
--  nota maior que o total, prova de mil questoes, tempo absurdo,
--  ou nome usado para colar propaganda.
--
--  Isto NAO impede um aluno curioso de mandar uma nota boa demais.
--  Para um quiz de estudo da turma, isso segue valendo o que ja diz
--  o LEIA-ME: e um risco conhecido e aceito.
-- ============================================================

alter table public.placar drop constraint if exists placar_valido;
alter table public.placar add constraint placar_valido check (
  acertos <= total                      -- nao da para acertar mais do que tem
  and total between 1 and 200           -- prova de tamanho plausivel
  and segundos between 1 and 14400      -- no maximo 4 horas
  and char_length(quiz) between 1 and 40
  and nome !~* 'https?://'              -- nome nao serve para divulgar link
  and nome !~ E'[\\n\\r\\t]'            -- nem para quebrar a lista em varias linhas
);
