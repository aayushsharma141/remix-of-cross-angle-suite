import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function sendWhatsAppNotification(lead: { name: string; email: string; phone?: string; message?: string }) {
  const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
  const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
  const fromNumber = Deno.env.get("TWILIO_WHATSAPP_FROM");
  const adminNumber = Deno.env.get("ADMIN_WHATSAPP_NUMBER");

  if (!accountSid || !authToken || !fromNumber || !adminNumber) {
    console.log("Twilio credentials not configured, skipping WhatsApp notification");
    return;
  }

  try {
    const message = `🏠 *New Lead from Cross Angle Interior*\n\n*Name:* ${lead.name}\n*Email:* ${lead.email}\n*Phone:* ${lead.phone || 'Not provided'}\n*Message:* ${lead.message || 'No message'}`;

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
        },
        body: new URLSearchParams({
          From: `whatsapp:${fromNumber}`,
          To: `whatsapp:${adminNumber}`,
          Body: message,
        }),
      }
    );

    if (!response.ok) {
      console.error("Twilio API error:", await response.text());
    } else {
      console.log("WhatsApp notification sent successfully");
    }
  } catch (error) {
    console.error("Error sending WhatsApp notification:", error);
  }
}

async function syncToGoogleSheets(lead: { name: string; email: string; phone?: string; message?: string; category?: string }) {
  const webhookUrl = Deno.env.get("GOOGLE_SHEETS_WEBHOOK_URL");

  if (!webhookUrl) {
    console.log("Google Sheets webhook not configured, skipping sync");
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        phone: lead.phone || "",
        message: lead.message || "",
        category: lead.category || "other",
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error("Google Sheets webhook error:", await response.text());
    } else {
      console.log("Lead synced to Google Sheets successfully");
    }
  } catch (error) {
    console.error("Error syncing to Google Sheets:", error);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message, category } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    // Send WhatsApp notification
    await sendWhatsAppNotification({ name, email, phone, message });

    // Sync to Google Sheets
    await syncToGoogleSheets({ name, email, phone, message, category });

    if (!LOVABLE_API_KEY) {
      console.log("LOVABLE_API_KEY not configured, skipping AI response");
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Generate AI response
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a professional interior design consultant at Cross Angle Interior. Generate a warm, professional acknowledgment message for a new inquiry. Be friendly but professional. Keep the response under 100 words. Include a brief mention that our team will reach out within 24 hours to discuss their project in detail.`
          },
          {
            role: "user",
            content: `New inquiry from ${name} (${email}): "${message}"`
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      console.error("AI gateway error:", await aiResponse.text());
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiResponse.json();
    const generatedResponse = aiData.choices?.[0]?.message?.content || "";

    // Update lead with AI response
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase
      .from("leads")
      .update({ ai_response: generatedResponse })
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1);

    console.log("Lead processed with AI response, WhatsApp notification, and Google Sheets sync");

    return new Response(JSON.stringify({ success: true, aiResponse: generatedResponse }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error processing lead:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});