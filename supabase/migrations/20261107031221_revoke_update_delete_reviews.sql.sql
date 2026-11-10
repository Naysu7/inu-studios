/*
# Revoke unintended UPDATE/DELETE on reviews

1. Security
- Revoke UPDATE and DELETE from anon + authenticated on `reviews`.
- The table only needs SELECT (public read) and INSERT (public submit).
- RLS already had no UPDATE/DELETE policies so those verbs were already blocked,
  this tightens the grant to match actual usage (least privilege).
*/

REVOKE UPDATE, DELETE ON reviews FROM anon, authenticated;
