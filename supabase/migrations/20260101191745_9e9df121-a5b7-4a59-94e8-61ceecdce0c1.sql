-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- Create lead category enum
CREATE TYPE public.lead_category AS ENUM ('residential', 'commercial', 'other');

-- Create lead source enum  
CREATE TYPE public.lead_source AS ENUM ('website', 'referral', 'social', 'other');

-- User roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'editor',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

-- Site content table for editable content
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL UNIQUE,
  title TEXT,
  subtitle TEXT,
  content TEXT,
  image_url TEXT,
  metadata JSONB DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_by UUID REFERENCES auth.users(id)
);

-- Portfolio items
CREATE TABLE public.portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'residential',
  image_url TEXT,
  video_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  created_by UUID REFERENCES auth.users(id)
);

-- Blog posts
CREATE TABLE public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  author_id UUID REFERENCES auth.users(id)
);

-- Leads table
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  category lead_category DEFAULT 'other',
  source lead_source DEFAULT 'website',
  ai_response TEXT,
  is_contacted BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function to check if user is admin or editor
CREATE OR REPLACE FUNCTION public.is_admin_or_editor(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'editor')
  )
$$;

-- RLS Policies for user_roles
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own role" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for site_content (public read, admin/editor write)
CREATE POLICY "Anyone can read site content" ON public.site_content
  FOR SELECT USING (true);

CREATE POLICY "Admins and editors can update site content" ON public.site_content
  FOR UPDATE USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can insert site content" ON public.site_content
  FOR INSERT WITH CHECK (public.is_admin_or_editor(auth.uid()));

-- RLS Policies for portfolio (public read, admin/editor write)
CREATE POLICY "Anyone can read portfolio" ON public.portfolio
  FOR SELECT USING (true);

CREATE POLICY "Admins and editors can manage portfolio" ON public.portfolio
  FOR ALL USING (public.is_admin_or_editor(auth.uid()));

-- RLS Policies for blogs (published public, all for admin/editor)
CREATE POLICY "Anyone can read published blogs" ON public.blogs
  FOR SELECT USING (is_published = true OR public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can manage blogs" ON public.blogs
  FOR ALL USING (public.is_admin_or_editor(auth.uid()));

-- RLS Policies for leads (admin/editor only)
CREATE POLICY "Admins and editors can view leads" ON public.leads
  FOR SELECT USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Anyone can insert leads" ON public.leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins and editors can update leads" ON public.leads
  FOR UPDATE USING (public.is_admin_or_editor(auth.uid()));

-- Create storage bucket for media
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Storage policies
CREATE POLICY "Anyone can view media" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can upload media" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update media" ON storage.objects
  FOR UPDATE USING (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete media" ON storage.objects
  FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'authenticated');

-- Updated at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolio_updated_at
  BEFORE UPDATE ON public.portfolio
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default site content
INSERT INTO public.site_content (section_key, title, subtitle, content) VALUES
  ('hero', 'Crafting Spaces That Inspire', 'Where Vision Meets Elegance', 'At Cross Angle Interior, we transform ordinary spaces into extraordinary experiences. Our award-winning design team brings your vision to life with meticulous attention to detail and uncompromising quality.'),
  ('about', 'About Cross Angle Interior', 'Two Decades of Design Excellence', 'Founded in 2005, Cross Angle Interior has established itself as a premier interior design firm. We specialize in creating bespoke residential and commercial spaces that reflect our clients'' unique personalities and aspirations. Our philosophy centers on the perfect intersection of aesthetics and functionality.'),
  ('services', 'Our Services', 'Comprehensive Design Solutions', 'From concept to completion, we offer a full spectrum of interior design services tailored to your needs.');