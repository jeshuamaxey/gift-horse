-- Recipients table (people who receive gifts, NOT app users)
create table if not exists public.recipients (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  birthday date,
  emoji text, -- single emoji character
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  
  -- Ensure name is not empty
  constraint recipients_name_not_empty check (char_length(trim(name)) > 0)
);

-- Enable Row Level Security
alter table public.recipients enable row level security;

-- RLS Policies
create policy "Users can view their own recipients"
  on public.recipients for select
  using (auth.uid() = user_id);

create policy "Users can insert their own recipients"
  on public.recipients for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own recipients"
  on public.recipients for update
  using (auth.uid() = user_id);

create policy "Users can delete their own recipients"
  on public.recipients for delete
  using (auth.uid() = user_id);

-- Indexes for performance
create index if not exists recipients_user_id_idx on public.recipients(user_id);
create index if not exists recipients_user_id_name_idx on public.recipients(user_id, name);

