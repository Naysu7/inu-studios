/*
# Create reviews table (single-tenant, public portfolio reviews)

1. New Tables
- `reviews`
  - `id` (uuid, primary key)
  - `name` (text, not null) — reviewer display name
  - `rating` (int, 1–5, not null) — star rating
  - `text` (text, not null) — review body
  - `approved` (boolean, default true) — moderation flag (kept true by default so the portfolio shows submissions immediately; can be flipped to moderate later)
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `reviews`.
- Grant SELECT to `anon, authenticated` so the public portfolio can list reviews.
- Grant INSERT to `anon, authenticated` so visitors can leave a review without signing in.
- No UPDATE or DELETE grants (reviews are immutable once submitted from the public form).
- Public SELECT + INSERT policies (intentionally shared data, no sign-in screen on this portfolio).
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text text NOT NULL,
  approved boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT ON reviews TO anon, authenticated;

DROP POLICY IF EXISTS "public_select_reviews" ON reviews;
CREATE POLICY "public_select_reviews"
  ON reviews FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "public_insert_reviews" ON reviews;
CREATE POLICY "public_insert_reviews"
  ON reviews FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
