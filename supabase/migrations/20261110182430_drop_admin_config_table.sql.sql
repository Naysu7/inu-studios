/*
# Drop admin_config table — passkey verified via edge function secret

1. Removed Tables
- `admin_config` — no longer needed. The admin passkey is verified server-side by the
  edge function against the ADMIN_PASSKEY secret (configured in Supabase secrets),
  not against a database row. This avoids storing password material in the database.

2. Security
- Removes the singleton admin_config table and its (empty) policies.
- suppressed_seeds table is retained and unchanged.
*/

DROP TABLE IF EXISTS admin_config;
