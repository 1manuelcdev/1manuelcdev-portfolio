-- ============================================================
-- Storage Policies for 1manuelcdev-portfolio-media bucket
-- Execute no Supabase SQL Editor
-- ============================================================

-- Leitura pública das imagens (site público precisa ver as capas)
create policy "Leitura pública de imagens"
  on storage.objects for select
  using (bucket_id = '1manuelcdev-portfolio-media');

-- Upload apenas para usuários autenticados
create policy "Autenticado faz upload de imagens"
  on storage.objects for insert
  with check (
    bucket_id = '1manuelcdev-portfolio-media'
    and auth.role() = 'authenticated'
  );

-- Update apenas para usuários autenticados (upsert)
create policy "Autenticado atualiza imagens"
  on storage.objects for update
  using (
    bucket_id = '1manuelcdev-portfolio-media'
    and auth.role() = 'authenticated'
  );

-- Delete apenas para usuários autenticados
create policy "Autenticado remove imagens"
  on storage.objects for delete
  using (
    bucket_id = '1manuelcdev-portfolio-media'
    and auth.role() = 'authenticated'
  );
