-- Supabase schema for users, videos, likes, comments and storage bucket

-- Create profiles table (linked to auth.users)
create table if not exists public.users (
  id uuid primary key,
  name text,
  role text check (role in ('user','admin','influencer')) default 'user',
  image text,
  created_at timestamp with time zone default now()
);

-- Automatically create a profile on sign-up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Videos table
create table if not exists public.videos (
  id bigserial primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  video_url text,
  storage_path text,
  type text not null check (type in ('uploaded','embed')),
  created_at timestamp with time zone default now()
);

-- Likes table
create table if not exists public.likes (
  id bigserial primary key,
  video_id bigint not null references public.videos(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique (video_id, user_id)
);

-- Comments table
create table if not exists public.comments (
  id bigserial primary key,
  video_id bigint not null references public.videos(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.videos enable row level security;
alter table public.likes enable row level security;
alter table public.comments enable row level security;

-- RLS policies
-- Users
create policy if not exists "Users are viewable by authenticated users" on public.users
for select using (auth.role() = 'authenticated');

create policy if not exists "Users can update their own profile" on public.users
for update using (auth.uid() = id);

-- Videos
create policy if not exists "Videos are viewable by everyone" on public.videos
for select using (true);

create policy if not exists "Users can insert their videos" on public.videos
for insert with check (auth.uid() = user_id);

create policy if not exists "Users can update their videos" on public.videos
for update using (auth.uid() = user_id);

create policy if not exists "Users can delete their videos" on public.videos
for delete using (auth.uid() = user_id);

-- Likes
create policy if not exists "Likes are viewable by everyone" on public.likes
for select using (true);

create policy if not exists "Users can like" on public.likes
for insert with check (auth.uid() = user_id);

create policy if not exists "Users can unlike their likes" on public.likes
for delete using (auth.uid() = user_id);

-- Comments
create policy if not exists "Comments are viewable by everyone" on public.comments
for select using (true);

create policy if not exists "Users can comment" on public.comments
for insert with check (auth.uid() = user_id);

create policy if not exists "Users can delete their comments" on public.comments
for delete using (auth.uid() = user_id);

-- Storage bucket for videos
insert into storage.buckets (id, name, public)
values ('videos','videos', true)
on conflict (id) do nothing;

-- Storage policies
create policy if not exists "Public can view videos"
  on storage.objects for select using (bucket_id = 'videos');

create policy if not exists "Authenticated users can upload to their folder"
  on storage.objects for insert with check (
    bucket_id = 'videos' and auth.role() = 'authenticated' and (strpos(name, auth.uid()::text || '/') = 1)
  );

create policy if not exists "Users can manage their own files"
  on storage.objects for delete using (
    bucket_id = 'videos' and auth.uid()::text = split_part(name, '/', 1)
  );
