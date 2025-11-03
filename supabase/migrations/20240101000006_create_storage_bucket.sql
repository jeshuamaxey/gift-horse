-- Create storage bucket for gift images
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'gift-images',
  'gift-images',
  false, -- private bucket
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

-- Storage policies for gift-images bucket
-- Users can only upload to their own folder structure: {user_id}/{gift_id}/{filename}
create policy "Users can upload their own gift images"
on storage.objects for insert
with check (
  bucket_id = 'gift-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can view their own images
create policy "Users can view their own gift images"
on storage.objects for select
using (
  bucket_id = 'gift-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can update their own images
create policy "Users can update their own gift images"
on storage.objects for update
using (
  bucket_id = 'gift-images'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'gift-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can delete their own images
create policy "Users can delete their own gift images"
on storage.objects for delete
using (
  bucket_id = 'gift-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

