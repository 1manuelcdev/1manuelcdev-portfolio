-- ============================================================
-- Portfolio Database Schema
-- Execute no Supabase SQL Editor
-- ============================================================

-- 1. Feature Flags (se já não existir)
create table if not exists feature_flags (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

-- Dados iniciais das feature flags (insere só se não existir)
insert into feature_flags (name, enabled)
values ('experience', true), ('projects', true)
on conflict (name) do nothing;

-- 2. Hero Content (singleton - apenas 1 row)
create table if not exists hero_content (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  description text not null default '',
  github_url text not null default '',
  linkedin_url text not null default '',
  instagram_url text not null default '',
  created_at timestamptz not null default now()
);

-- Garante apenas 1 row
create or replace function enforce_single_hero_content()
returns trigger as $$
begin
  if (select count(*) from hero_content) >= 1 then
    raise exception 'hero_content deve ter apenas 1 registro';
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists single_hero_content_trigger on hero_content;
create trigger single_hero_content_trigger
  before insert on hero_content
  for each row
  execute function enforce_single_hero_content();

-- Dados iniciais do hero
insert into hero_content (title, description, github_url, linkedin_url, instagram_url)
values (
  'Design, Engenharia, Atitude',
  'Desenvolvedor fullstack em formação em Ciência da Computação (IFCE), com experiência prática em produção construindo e otimizando aplicações React, Next.js e NestJS.',
  'https://github.com/1manuelcdev',
  'https://linkedin.com/in/1manuelcdev',
  'https://instagram.com/1manuelcdev'
)
on conflict do nothing;

-- 3. Projects
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  cover_url text,
  project_url text,
  stack text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- 4. Experiences
create table if not exists experiences (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null,
  location text not null,
  description text not null default '',
  from_date date not null,
  to_date date,
  is_current boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- RLS (Row Level Security)
-- ============================================================

alter table feature_flags enable row level security;
alter table hero_content enable row level security;
alter table projects enable row level security;
alter table experiences enable row level security;

-- Leitura pública (site público precisa ler os dados)
create policy "Leitura pública de feature_flags"
  on feature_flags for select using (true);

create policy "Leitura pública de hero_content"
  on hero_content for select using (true);

create policy "Leitura pública de projects"
  on projects for select using (true);

create policy "Leitura pública de experiences"
  on experiences for select using (true);

-- Escrita apenas para usuários autenticados (dashboard)
create policy "Autenticado gerencia feature_flags"
  on feature_flags for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Autenticado gerencia hero_content"
  on hero_content for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Autenticado gerencia projects"
  on projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Autenticado gerencia experiences"
  on experiences for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
