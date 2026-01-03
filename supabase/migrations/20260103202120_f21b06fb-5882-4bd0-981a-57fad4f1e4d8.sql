-- Fix storage policy: Restrict uploads to admin/editor roles only
-- Drop the existing overly permissive upload policy
DROP POLICY IF EXISTS "Authenticated users can upload media" ON storage.objects;

-- Create a new restrictive policy that only allows admins and editors to upload
CREATE POLICY "Admins and editors can upload media" 
ON storage.objects 
FOR INSERT 
TO authenticated
WITH CHECK (
  bucket_id = 'media' 
  AND public.is_admin_or_editor(auth.uid())
);

-- Also restrict updates to admins/editors
DROP POLICY IF EXISTS "Admins and editors can update media" ON storage.objects;
CREATE POLICY "Admins and editors can update media" 
ON storage.objects 
FOR UPDATE 
TO authenticated
USING (
  bucket_id = 'media' 
  AND public.is_admin_or_editor(auth.uid())
);

-- Also restrict deletes to admins/editors
DROP POLICY IF EXISTS "Admins and editors can delete media" ON storage.objects;
CREATE POLICY "Admins and editors can delete media" 
ON storage.objects 
FOR DELETE 
TO authenticated
USING (
  bucket_id = 'media' 
  AND public.is_admin_or_editor(auth.uid())
);