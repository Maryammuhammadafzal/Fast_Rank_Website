-- Create products table for marketplace items
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null,
  da integer check (da >= 1 and da <= 100),
  dr integer check (dr >= 1 and dr <= 100),
  monthly_traffic text not null,
  delivery_time text not null,
  description text not null,
  category text not null,
  status text not null default 'active' check (status in ('active', 'inactive', 'pending')),
  price integer not null check (price > 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.products enable row level security;

-- Create policies for products (public read access, admin write access)
create policy "Allow public read access to active products"
  on public.products for select
  using (status = 'active');

create policy "Allow admin full access to products"
  on public.products for all
  using (true);

-- Create function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Create trigger to automatically update updated_at
create trigger handle_products_updated_at
  before update on public.products
  for each row
  execute function public.handle_updated_at();
