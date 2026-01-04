-- Add RLS policies for the media storage bucket
-- Public can read (needed for portfolio images displayed on public site)
-- Only authenticated admins/editors can upload, update, delete

-- First, enable RLS on storage.objects if not already enabled
-- Note: This applies to the existing 'media' bucket

-- Policy: Anyone can read files from the media bucket (for public portfolio display)
CREATE POLICY "Anyone can view media files"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

-- Policy: Authenticated admins/editors can upload files to the media bucket
CREATE POLICY "Admins and editors can upload media files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'media' 
  AND public.is_admin_or_editor(auth.uid())
);

-- Policy: Authenticated admins/editors can update files in the media bucket
CREATE POLICY "Admins and editors can update media files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'media' 
  AND public.is_admin_or_editor(auth.uid())
);

-- Policy: Authenticated admins/editors can delete files from the media bucket
CREATE POLICY "Admins and editors can delete media files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'media' 
  AND public.is_admin_or_editor(auth.uid())
);