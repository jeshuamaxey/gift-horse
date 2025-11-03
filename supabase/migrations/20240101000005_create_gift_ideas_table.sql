-- Create enum type for gift states
create type gift_state as enum ('idea', 'acquired', 'gifted', 'abandoned');

-- Gift Ideas table
create table if not exists public.gift_ideas (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  recipient_id uuid references public.recipients(id) on delete set null,
  title text not null,
  price numeric(10, 2), -- decimal with 2 decimal places
  link text, -- URL to product page
  notes text, -- longer description/notes
  image_url text, -- Supabase Storage reference
  state gift_state not null default 'idea',
  occasion_id uuid references public.occasions(id) on delete set null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  
  -- Ensure title is not empty
  constraint gift_ideas_title_not_empty check (char_length(trim(title)) > 0),
  
  -- Ensure occasion_id can only be set if recipient_id is set
  constraint gift_ideas_occasion_requires_recipient check (
    (occasion_id is null) or (recipient_id is not null)
  )
);

-- Enable Row Level Security
alter table public.gift_ideas enable row level security;

-- RLS Policies
create policy "Users can view their own gift ideas"
  on public.gift_ideas for select
  using (auth.uid() = user_id);

create policy "Users can insert their own gift ideas"
  on public.gift_ideas for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own gift ideas"
  on public.gift_ideas for update
  using (auth.uid() = user_id);

create policy "Users can delete their own gift ideas"
  on public.gift_ideas for delete
  using (auth.uid() = user_id);

-- Indexes for performance
create index if not exists gift_ideas_user_id_idx on public.gift_ideas(user_id);
create index if not exists gift_ideas_user_id_recipient_id_idx on public.gift_ideas(user_id, recipient_id);
create index if not exists gift_ideas_state_idx on public.gift_ideas(state);
create index if not exists gift_ideas_created_at_idx on public.gift_ideas(created_at);

-- Function to automatically update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to update updated_at on gift_ideas
create trigger update_gift_ideas_updated_at
  before update on public.gift_ideas
  for each row
  execute function update_updated_at_column();

-- Trigger to update updated_at on recipients
create trigger update_recipients_updated_at
  before update on public.recipients
  for each row
  execute function update_updated_at_column();

-- Trigger to update updated_at on profiles
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row
  execute function update_updated_at_column();

-- Function to validate gift idea recipient and occasion belong to the same user
create or replace function validate_gift_idea_user_match()
returns trigger as $$
begin
  -- Validate recipient belongs to user (if recipient_id is set)
  if new.recipient_id is not null then
    if not exists (
      select 1 from public.recipients
      where recipients.id = new.recipient_id
      and recipients.user_id = new.user_id
    ) then
      raise exception 'Recipient does not belong to the user';
    end if;
  end if;

  -- Validate occasion belongs to user (if occasion_id is set)
  if new.occasion_id is not null then
    if not exists (
      select 1 from public.occasions
      where occasions.id = new.occasion_id
      and occasions.user_id = new.user_id
    ) then
      raise exception 'Occasion does not belong to the user';
    end if;
  end if;

  return new;
end;
$$ language plpgsql;

-- Trigger to validate gift idea user matching on insert and update
create trigger validate_gift_idea_user_match_trigger
  before insert or update on public.gift_ideas
  for each row
  execute function validate_gift_idea_user_match();

