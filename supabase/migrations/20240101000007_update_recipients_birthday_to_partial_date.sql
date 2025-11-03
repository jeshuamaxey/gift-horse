-- Update recipients table to support partial dates (month/day without year)
-- Remove the single birthday date field and replace with separate month, day, year fields

-- Add new columns for partial date support
alter table public.recipients
  add column birthday_month integer,
  add column birthday_day integer,
  add column birthday_year integer;

-- Add constraints for valid month (1-12) and day (1-31) ranges
alter table public.recipients
  add constraint recipients_birthday_month_check 
    check (birthday_month is null or (birthday_month >= 1 and birthday_month <= 12));

alter table public.recipients
  add constraint recipients_birthday_day_check 
    check (birthday_day is null or (birthday_day >= 1 and birthday_day <= 31));

alter table public.recipients
  add constraint recipients_birthday_year_check 
    check (birthday_year is null or (birthday_year >= 1900 and birthday_year <= 2100));

-- Migrate existing birthday data (if any exists)
-- Extract month, day, year from existing birthday date field
update public.recipients
set 
  birthday_month = extract(month from birthday)::integer,
  birthday_day = extract(day from birthday)::integer,
  birthday_year = extract(year from birthday)::integer
where birthday is not null;

-- Drop the old birthday column
alter table public.recipients
  drop column birthday;

-- Add index for birthday queries (useful for finding upcoming birthdays)
create index if not exists recipients_birthday_month_day_idx 
  on public.recipients(birthday_month, birthday_day) 
  where birthday_month is not null and birthday_day is not null;

