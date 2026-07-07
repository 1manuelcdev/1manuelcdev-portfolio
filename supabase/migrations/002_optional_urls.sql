-- ============================================================
-- Migração: tornar cover_url e project_url opcionais
-- Execute no Supabase SQL Editor se a tabela já existir
-- ============================================================

-- Tornar cover_url nullable
ALTER TABLE projects ALTER COLUMN cover_url DROP NOT NULL;
ALTER TABLE projects ALTER COLUMN cover_url DROP DEFAULT;

-- Tornar project_url nullable
ALTER TABLE projects ALTER COLUMN project_url DROP NOT NULL;
ALTER TABLE projects ALTER COLUMN project_url DROP DEFAULT;
