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
