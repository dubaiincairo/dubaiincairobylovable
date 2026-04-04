-- Add unique constraint on key
ALTER TABLE public.site_content ADD CONSTRAINT site_content_key_unique UNIQUE (key);

-- Allow admins to insert new site content rows
CREATE POLICY "Admins can insert site content"
ON public.site_content
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Enable realtime for site_content
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_content;