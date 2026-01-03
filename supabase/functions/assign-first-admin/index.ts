// Lovable Cloud Function: assign-first-admin
// Purpose: During initial setup, allow creating exactly one admin role when there are no admins yet.
// Security: 
// - If an admin already exists, only authenticated admins can assign roles.
// - If no admin exists, allow the first authenticated user to self-assign admin.

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

type Json = Record<string, unknown>;

type Body = {
  user_id?: string;
};

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(JSON.stringify({ error: "Server not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Authenticated client (uses user JWT from Authorization header)
    const authClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY") ?? "", {
      global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
    });

    const { data: authData, error: authError } = await authClient.auth.getUser();
    if (authError || !authData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json().catch(() => ({}))) as Body;
    const requestedUserId = body.user_id;
    const callerUserId = authData.user.id;

    if (!requestedUserId || typeof requestedUserId !== "string") {
      return new Response(JSON.stringify({ error: "Missing user_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Service role client for privileged DB access
    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Is there any admin already?
    const { count: adminCount, error: countError } = await adminClient
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");

    if (countError) throw countError;

    // If no admins exist, only allow caller to assign themselves
    if ((adminCount ?? 0) === 0) {
      if (requestedUserId !== callerUserId) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    } else {
      // If admins exist, require caller is admin
      const { data: callerRole, error: callerRoleError } = await adminClient
        .from("user_roles")
        .select("role")
        .eq("user_id", callerUserId)
        .eq("role", "admin")
        .maybeSingle();

      if (callerRoleError || !callerRole) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Upsert admin role for requested user
    const { error: upsertError } = await adminClient
      .from("user_roles")
      .upsert({ user_id: requestedUserId, role: "admin" }, { onConflict: "user_id,role" });

    if (upsertError) throw upsertError;

    return new Response(JSON.stringify({ ok: true } satisfies Json), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (_err) {
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
