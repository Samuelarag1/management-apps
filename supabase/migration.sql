-- ============================================================
-- Freelance Manager — Supabase Migration
-- Run this in: Supabase Dashboard > SQL Editor
-- ============================================================

-- Tables
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  alias text not null default '',
  email text,
  phone_number text,
  location text,
  status text not null default 'Activo'
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  name text not null,
  description text,
  price numeric(12, 2),
  status text not null default 'activo',
  initial_date date,
  finish_date date,
  pre_payment numeric(12, 2),
  hosting date,
  domain date,
  cloud_storage boolean not null default false,
  cloud_storage_date date
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  title text not null,
  description text,
  status text not null default 'pendiente',
  priority text not null default 'media',
  due_date date
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  invoice_number text,
  status text not null default 'borrador',
  issue_date date not null default current_date,
  due_date date,
  subtotal numeric(12, 2) not null default 0,
  tax_rate numeric(5, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  notes text,
  items jsonb not null default '[]'::jsonb
);

-- Row Level Security
alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;
alter table public.invoices enable row level security;

-- Policies: clients
create policy "clients_select" on public.clients for select using (auth.uid() = user_id);
create policy "clients_insert" on public.clients for insert with check (auth.uid() = user_id);
create policy "clients_update" on public.clients for update using (auth.uid() = user_id);
create policy "clients_delete" on public.clients for delete using (auth.uid() = user_id);

-- Policies: projects
create policy "projects_select" on public.projects for select using (auth.uid() = user_id);
create policy "projects_insert" on public.projects for insert with check (auth.uid() = user_id);
create policy "projects_update" on public.projects for update using (auth.uid() = user_id);
create policy "projects_delete" on public.projects for delete using (auth.uid() = user_id);

-- Policies: tasks
create policy "tasks_select" on public.tasks for select using (auth.uid() = user_id);
create policy "tasks_insert" on public.tasks for insert with check (auth.uid() = user_id);
create policy "tasks_update" on public.tasks for update using (auth.uid() = user_id);
create policy "tasks_delete" on public.tasks for delete using (auth.uid() = user_id);

-- Policies: invoices
create policy "invoices_select" on public.invoices for select using (auth.uid() = user_id);
create policy "invoices_insert" on public.invoices for insert with check (auth.uid() = user_id);
create policy "invoices_update" on public.invoices for update using (auth.uid() = user_id);
create policy "invoices_delete" on public.invoices for delete using (auth.uid() = user_id);

-- Performance indexes
create index if not exists clients_user_id_idx on public.clients(user_id);
create index if not exists projects_user_id_idx on public.projects(user_id);
create index if not exists projects_client_id_idx on public.projects(client_id);
create index if not exists tasks_user_id_idx on public.tasks(user_id);
create index if not exists tasks_project_id_idx on public.tasks(project_id);
create index if not exists invoices_user_id_idx on public.invoices(user_id);
create index if not exists invoices_client_id_idx on public.invoices(client_id);
create index if not exists invoices_status_idx on public.invoices(status);

-- ============================================================
-- Mantenimientos (agregar después de la migración inicial)
-- ============================================================

create table if not exists public.maintenances (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  name text not null,
  amount numeric(12, 2) not null default 0,
  billing_day integer not null default 1,
  status text not null default 'activo',
  start_date date not null default current_date,
  notes text
);

alter table public.maintenances enable row level security;

create policy "maintenances_select" on public.maintenances for select using (auth.uid() = user_id);
create policy "maintenances_insert" on public.maintenances for insert with check (auth.uid() = user_id);
create policy "maintenances_update" on public.maintenances for update using (auth.uid() = user_id);
create policy "maintenances_delete" on public.maintenances for delete using (auth.uid() = user_id);

create index if not exists maintenances_user_id_idx on public.maintenances(user_id);
create index if not exists maintenances_status_idx on public.maintenances(status);
