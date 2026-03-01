import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PRODUCT_CATALOG = `
ID|Name|Category|Price(₹)|Tags
1|Classic Oxford Shirt|Shirts|2499|casual,office,bestseller
2|Formal White Shirt|Shirts|2999|formal,office,classic
3|Printed Floral Shirt|Shirts|1899|summer,casual,trendy
4|Denim Casual Shirt|Shirts|2299|casual,denim,versatile
5|Linen Relaxed Shirt|Shirts|2199|summer,linen,breathable
6|Essential Plain Tee|T-Shirts|799|basic,essential,casual
7|Graphic Oversized Tee|T-Shirts|1299|streetwear,graphic,oversized
8|Classic Polo T-Shirt|T-Shirts|1799|polo,casual,classic
9|Oversized Drop Shoulder Tee|T-Shirts|1499|streetwear,oversized,trendy
10|Classic Pullover Hoodie|Hoodies|2499|winter,cozy,casual
11|Graphic Street Hoodie|Hoodies|2999|streetwear,graphic,urban
12|Crewneck Sweatshirt|Sweatshirts|1999|casual,winter,comfortable
13|Classic Bomber Jacket|Jackets|4999|jacket,winter,classic
14|Classic Denim Jacket|Jackets|3999|denim,casual,versatile
15|Premium Leather Jacket|Jackets|12999|leather,premium,statement
16|Down Puffer Jacket|Jackets|5999|winter,warm,puffer
17|Wool Blend Blazer|Blazers|7999|formal,office,classic
18|Velvet Dinner Jacket|Blazers|12999|party,luxury,evening
19|Skinny Fit Jeans|Jeans|2499|denim,skinny,casual
20|Slim Fit Jeans|Jeans|2299|denim,slim,versatile
21|Baggy Street Jeans|Jeans|2799|streetwear,baggy,trendy
22|Ripped Distressed Jeans|Jeans|2599|streetwear,ripped,edgy
23|Slim Fit Chinos|Trousers|1999|casual,office,versatile
24|Formal Dress Trousers|Trousers|2799|formal,office,classic
25|Cargo Utility Pants|Trousers|2399|utility,streetwear,functional
26|Tech Fleece Joggers|Joggers|2299|athleisure,comfort,casual
27|Classic Track Pants|Track Pants|1799|sporty,casual,comfortable
28|Chino Shorts|Shorts|1499|summer,casual,comfortable
29|Embroidered Kurta Set|Traditional|4999|festive,traditional,wedding
30|Short Cotton Kurta|Traditional|1999|casual,traditional,comfortable
31|Designer Nehru Jacket|Traditional|5999|formal,traditional,elegant
32|Royal Sherwani|Traditional|24999|wedding,luxury,traditional
33|Classic White Sneakers|Footwear|3999|casual,sneakers,everyday
34|Running Performance Shoes|Footwear|4499|sports,running,performance
35|Oxford Formal Shoes|Footwear|5999|formal,office,classic
36|Leather Loafers|Footwear|4499|casual,loafers,comfortable
37|Chelsea Boots|Footwear|6999|boots,classic,versatile
38|Premium Leather Belt|Accessories|1499|leather,essential,classic
39|Classic Aviator Sunglasses|Accessories|2999|sunglasses,classic,summer
40|Leather Bifold Wallet|Accessories|1999|leather,wallet,essential
41|Chronograph Watch|Accessories|7999|watch,luxury,classic
42|Snapback Cap|Accessories|899|streetwear,cap,casual
43|Leather Backpack|Accessories|5999|bag,leather,travel
44|Premium Eau De Parfum|Grooming|3999|fragrance,luxury,grooming
45|Beard Grooming Kit|Grooming|1499|beard,grooming,kit
46|Basic Cotton Tee|T-Shirts|599|budget,basic,essential
47|Casual Socks Pack|Accessories|399|socks,basic,essential
48|Premium Co-ord Set|Co-ord Sets|3999|summer,matching,trendy
49|Urban Street Co-ord|Co-ord Sets|4499|streetwear,urban,matching
50|Thermal Inner Wear|Innerwear|999|winter,thermal,warm
`;

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

PRODUCT CATALOG:
${PRODUCT_CATALOG}

CRITICAL RESPONSE FORMAT:
- When recommending products, you MUST include product tags using the format [[product:ID]] where ID is the product number from the catalog above.
- Example: "Check out the **Classic Oxford Shirt** [[product:1]] — it's perfect for office wear!"
- Always include at least 1-3 product tags when recommending items.
- Place the [[product:ID]] tag RIGHT AFTER mentioning the product name.
- Use **bold** for product names.
- Keep it conversational and helpful.
- End responses with a helpful follow-up question or suggestion.

RULES:
- Always suggest specific products from the catalog with their [[product:ID]] tags
- When suggesting outfits, break them into: Topwear + Bottomwear + Footwear + Accessories
- If user mentions budget, stay within it
- For body type questions, be sensitive and positive
- Never say "I don't know" — redirect to browsing collections instead`;

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
