-- CMS Enhancements: testimonials, activity log, SEO, cover images

-- Testimonials table
create table if not exists testimonials (
  id uuid default gen_random_uuid() primary key,
  client_name text not null,
  role text,
  company text,
  content text not null,
  rating integer default 5 check (rating between 1 and 5),
  avatar_url text,
  sort_order integer default 0,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table testimonials enable row level security;
create policy "Admin full access on testimonials"
  on testimonials for all
  using (exists (select 1 from user_roles where user_id = auth.uid() and role = 'admin'));
create policy "Public read published testimonials"
  on testimonials for select
  using (published = true);

-- Admin activity log
create table if not exists admin_activity_log (
  id uuid default gen_random_uuid() primary key,
  user_email text,
  action text not null,          -- 'updated', 'created', 'deleted', 'published', 'unpublished'
  entity_type text not null,     -- 'content', 'case_study', 'job', 'bank', 'testimonial'
  entity_label text,             -- human-readable name e.g. "Hero Section", "Novartis"
  fields_changed integer,        -- how many fields changed (for content saves)
  created_at timestamptz default now()
);

alter table admin_activity_log enable row level security;
create policy "Admin full access on activity log"
  on admin_activity_log for all
  using (exists (select 1 from user_roles where user_id = auth.uid() and role = 'admin'));

-- Add cover_image_url to case_studies
alter table case_studies add column if not exists cover_image_url text;
