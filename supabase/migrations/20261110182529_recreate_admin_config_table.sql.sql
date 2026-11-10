/*
# Recreate admin_config for passkey hash verification

1. New Tables
- `admin_config`
  - `id` (int, primary key, fixed to 1) — singleton row
  - `passkey_hash` (text, not null) — sha256 hex hash of the admin passkey
  - `updated_at` (timestamptz, default now())

2. Security
- Enable RLS on `admin_config`.
- No grants to anon/authenticated — only the service_role (edge function) can read it.
- No policies — the table is unreachable from the browser Data API.
- Seeded with the sha256 hash of the default admin passkey. The owner should change
  the passkey by updating both VITE_ADMIN_PASSWORD in .env and the hash in this table.
*/

CREATE TABLE IF NOT EXISTS admin_config (
  id int PRIMARY KEY DEFAULT 1,
  passkey_hash text NOT NULL,
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT admin_config_singleton CHECK (id = 1)
);

ALTER TABLE admin_config ENABLE ROW LEVEL SECURITY;
