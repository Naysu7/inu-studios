import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function sha256Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

async function verifyPasskey(supplied: string): Promise<boolean> {
  const suppliedHash = await sha256Hex(supplied);
  const { data, error } = await supabase
    .from("admin_config")
    .select("passkey_hash")
    .eq("id", 1)
    .maybeSingle();
  if (error || !data) return false;
  return safeEqual(suppliedHash, data.passkey_hash);
}

export default async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const auth = req.headers.get("Authorization");
    if (!auth || !auth.startsWith("Bearer ")) {
      return json({ error: "Unauthorized" }, 401);
    }

    const supplied = auth.slice("Bearer ".length).trim();
    const ok = await verifyPasskey(supplied);
    if (!ok) {
      return json({ error: "Invalid admin credentials." }, 403);
    }

    const url = new URL(req.url);
    const path = url.pathname.replace(/^\/admin-moderate/, "");

    // GET /suppressed → list suppressed seed ids
    if (req.method === "GET" && path === "/suppressed") {
      const { data, error } = await supabase
        .from("suppressed_seeds")
        .select("id");
      if (error) throw error;
      return json({ ids: (data ?? []).map((r) => r.id) });
    }

    // POST /delete-review { id } → delete a review row
    if (req.method === "POST" && path === "/delete-review") {
      const body = await req.json().catch(() => null);
      const id = typeof body?.id === "string" ? body.id : null;
      if (!id) return json({ error: "Missing review id." }, 400);
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
      return json({ ok: true });
    }

    // POST /suppress-seed { id } → hide a sample/seed review
    if (req.method === "POST" && path === "/suppress-seed") {
      const body = await req.json().catch(() => null);
      const id = typeof body?.id === "string" ? body.id : null;
      if (!id) return json({ error: "Missing seed id." }, 400);
      const { error } = await supabase
        .from("suppressed_seeds")
        .upsert({ id });
      if (error) throw error;
      return json({ ok: true });
    }

    // POST /restore-seed { id } → un-hide a sample/seed review
    if (req.method === "POST" && path === "/restore-seed") {
      const body = await req.json().catch(() => null);
      const id = typeof body?.id === "string" ? body.id : null;
      if (!id) return json({ error: "Missing seed id." }, 400);
      const { error } = await supabase
        .from("suppressed_seeds")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return json({ ok: true });
    }

    return json({ error: "Not found" }, 404);
  } catch (err) {
    console.error("admin-moderate error", err);
    return json({ error: "Request failed." }, 500);
  }
};
