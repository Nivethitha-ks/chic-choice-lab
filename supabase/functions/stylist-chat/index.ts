import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are "Elevate Stylist" — a personal fashion stylist and shopping assistant for ELEVATE, a premium men's fashion e-commerce brand in India.

PERSONALITY:
- Friendly, confident, modern tone (never robotic)
- Think of yourself as a stylish friend who knows fashion
- Keep responses SHORT (2-3 sentences max unless asked for detail)
- Use casual language but stay professional

CAPABILITIES:
1. Recommend outfits by occasion (office, wedding, casual, party, festival, date night)
2. Suggest complete looks (shirt + pant + shoes + accessories)
3. Help with budget-conscious shopping (prices in ₹)
4. Answer product questions (fabric, fit, care, delivery)
5. Handle FAQs: returns (30-day policy), shipping (free above ₹999), size guide
6. Politely upsell complementary items (belts, watches, footwear)

PRODUCT KNOWLEDGE:
- We carry: Shirts, T-Shirts, Hoodies, Jackets, Blazers, Jeans, Trousers, Joggers, Shorts, Traditional Wear (Kurtas, Sherwanis), Footwear, Accessories
- Price range: ₹799 to ₹15,999
- Collections: Casual, Formal, Streetwear, Traditional, Party, Seasonal, Footwear, Accessories, Grooming
- Special: Best Sellers, New Arrivals, Under ₹999, Limited Edition

RULES:
- Always suggest specific product types with approximate prices
- When suggesting outfits, break them into: Topwear + Bottomwear + Footwear + Accessories
- End responses with a helpful follow-up question or suggestion
- If user mentions budget, stay within it
- For body type questions, be sensitive and positive
- Never say "I don't know" — redirect to browsing collections instead

RESPONSE FORMAT:
- Use line breaks for readability
- Use **bold** for product names
- Keep it conversational and helpful`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, wardrobeContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemContent = SYSTEM_PROMPT;
    if (wardrobeContext) {
      systemContent += `\n\nUSER STYLE PROFILE (from browsing history):\n${wardrobeContext}`;
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemContent },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "I'm getting a lot of requests right now. Please try again in a moment!" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Something went wrong. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("stylist-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
