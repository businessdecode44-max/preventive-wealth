create extension if not exists pgcrypto;

create table if not exists public.affiliates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  slug text not null unique,
  website text,
  audience text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'paused')),
  commission_rate numeric(5,4) not null default 0.4000 check (commission_rate >= 0 and commission_rate <= 1),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.affiliate_orders (
  id uuid primary key default gen_random_uuid(),
  affiliate_id uuid not null references public.affiliates(id),
  stripe_checkout_session_id text not null unique,
  stripe_payment_intent_id text,
  product_key text,
  product_name text,
  customer_email text,
  amount_cents integer not null default 0,
  currency text not null default 'usd',
  commission_rate numeric(5,4) not null default 0,
  commission_cents integer not null default 0,
  order_status text not null default 'paid' check (order_status in ('paid', 'refunded', 'disputed', 'cancelled')),
  payout_status text not null default 'unpaid' check (payout_status in ('unpaid', 'pending', 'paid')),
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists affiliates_slug_idx on public.affiliates(slug);
create index if not exists affiliate_orders_affiliate_id_idx on public.affiliate_orders(affiliate_id);
create index if not exists affiliate_orders_payout_status_idx on public.affiliate_orders(payout_status);

alter table public.affiliates enable row level security;
alter table public.affiliate_orders enable row level security;

-- The website uses the Supabase service-role key only in server-side routes.
-- Keep browser clients blocked by default unless you later add public affiliate dashboards.
