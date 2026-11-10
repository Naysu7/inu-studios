/*
# Admin moderation support for reviews

1. New Tables
- `admin_config`
  - `id` (int, primary key, fixed to 1) — singleton row holding the owner passkey hash
  - `passkey_hash` (text, not null) — sha256 hex hash of the admin passkey
  - `updated_at` (timestamptz, default now())
- `suppressed_seeds`
  - `id` (text, primary key) — the seed review identifier (e.g. "seed-Maya R.")
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on both tables.
- `admin_config`: only the service_role can read/write (the edge function uses the service key).
  No anon/authenticated grants and no policies — the table is unreachable from the browser.
- `suppressed_seeds`: public SELECT for anon + authenticated so the frontend can hide
  suppressed sample reviews; INSERT/DELETE only via service_role (edge function).
  Grant SELECT to anon, authenticated only.
- Seed the admin_config singleton row with a placeholder hash. The edge function compares
  the sha256 of the supplied passkey against this value, so the owner must update it once
  via the edge function or SQL to match the real VITE_ADMIN_PASSWORD. To avoid storing the
  real password in a migration, the default is the sha256 of the literal "CHANGE_ME" —
  the edge function refuses to operate until it has been changed away from that default.
*/

CREATE TABLE IF NOT EXISTS admin_config (
  id int PRIMARY KEY DEFAULT 1,
  passkey_hash text NOT NULL,
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT admin_config_singleton CHECK (id = 1)
);

ALTER TABLE admin_config ENABLE ROW LEVEL SECURITY;

-- No grants to anon/authenticated: only service_role (edge function) can touch this table.

-- Seed singleton with placeholder hash of "CHANGE_ME"
INSERT INTO admin_config (id, passkey_hash)
VALUES (1, encode(digest('CHANGE_ME', 'sha256'), 'hex'))
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS suppressed_seeds (
  id text PRIMARY KEY,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE suppressed_seeds ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON suppressed_seeds TO anon, authenticated;

DROP POLICY IF EXISTS "public_select_suppressed_seeds" ON suppressed_seeds;
CREATE POLICY "public_select_suppressed_seeds"
  ON suppressed_seeds FOR SELECT
  TO anon, authenticated
  USING (true);
