-- Recipient-Occasion Mappings table (which recipients receive gifts for which occasions)
create table if not exists public.recipient_occasion_mappings (
  id uuid primary key default uuid_generate_v4(),
  recipient_id uuid not null references public.recipients(id) on delete cascade,
  occasion_id uuid not null references public.occasions(id) on delete cascade,
  created_at timestamp with time zone default now(),
  
  -- Ensure unique mapping per recipient-occasion pair
  constraint unique_recipient_occasion unique (recipient_id, occasion_id)
);

-- Enable Row Level Security
alter table public.recipient_occasion_mappings enable row level security;

-- RLS Policies - users can only access mappings for their own recipients and occasions
create policy "Users can view mappings for their recipients and occasions"
  on public.recipient_occasion_mappings for select
  using (
    exists (
      select 1 from public.recipients
      where recipients.id = recipient_occasion_mappings.recipient_id
      and recipients.user_id = auth.uid()
    )
    and exists (
      select 1 from public.occasions
      where occasions.id = recipient_occasion_mappings.occasion_id
      and occasions.user_id = auth.uid()
    )
  );

create policy "Users can insert mappings for their recipients and occasions"
  on public.recipient_occasion_mappings for insert
  with check (
    exists (
      select 1 from public.recipients
      where recipients.id = recipient_occasion_mappings.recipient_id
      and recipients.user_id = auth.uid()
    )
    and exists (
      select 1 from public.occasions
      where occasions.id = recipient_occasion_mappings.occasion_id
      and occasions.user_id = auth.uid()
    )
  );

create policy "Users can delete mappings for their recipients and occasions"
  on public.recipient_occasion_mappings for delete
  using (
    exists (
      select 1 from public.recipients
      where recipients.id = recipient_occasion_mappings.recipient_id
      and recipients.user_id = auth.uid()
    )
  );

-- Index for performance
create index if not exists recipient_occasion_mappings_recipient_id_idx 
  on public.recipient_occasion_mappings(recipient_id);
create index if not exists recipient_occasion_mappings_occasion_id_idx 
  on public.recipient_occasion_mappings(occasion_id);

