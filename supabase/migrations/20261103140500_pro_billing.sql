-- Tapas Pro: profiles (plan + Stripe state), personal registry tokens and a
-- processed-webhook log. RLS is on for every table: signed-in users can read
-- their own rows; all writes go through server routes using the service role.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  github_login text,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  subscription_status text,
  plan text not null default 'free' check (plan in ('free', 'pro')),
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: read own row"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

-- Every new auth user gets a free profile.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, github_login)
  values (new.id, new.raw_user_meta_data ->> 'user_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Personal tokens for the private shadcn registry. Only a SHA-256 hash is
-- stored; the token itself is shown once.
create table public.registry_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  token_hash text not null unique,
  created_at timestamptz not null default now(),
  last_used_at timestamptz,
  revoked_at timestamptz
);

create index registry_tokens_user_id_idx on public.registry_tokens (user_id);

alter table public.registry_tokens enable row level security;

create policy "registry_tokens: read own rows"
  on public.registry_tokens for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- Stripe event ids already applied, so retried webhooks are no-ops.
-- Service role only: RLS on with no policies.
create table public.stripe_events (
  id text primary key,
  type text not null,
  processed_at timestamptz not null default now()
);

alter table public.stripe_events enable row level security;
