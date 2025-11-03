-- Occasions table (user-defined occasions like Christmas, birthdays, etc.)
create table if not exists public.occasions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  default_date date, -- for recurring occasions (e.g., Dec 25 for Christmas)
  reminder_days_before integer, -- days before occasion to send reminder
  created_at timestamp with time zone default now(),
  
  -- Ensure name is not empty
  constraint occasions_name_not_empty check (char_length(trim(name)) > 0)
);

-- Enable Row Level Security
alter table public.occasions enable row level security;

-- RLS Policies
create policy "Users can view their own occasions"
  on public.occasions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own occasions"
  on public.occasions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own occasions"
  on public.occasions for update
  using (auth.uid() = user_id);

create policy "Users can delete their own occasions"
  on public.occasions for delete
  using (auth.uid() = user_id);

-- Index for performance
create index if not exists occasions_user_id_idx on public.occasions(user_id);

