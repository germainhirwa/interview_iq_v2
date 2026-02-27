import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { v5 as uuidv5 } from "uuid";
import { Database } from "../../database.types";

// Define a stable UUID namespace for generating deterministic IDs
const NAMESPACE = "1b671a64-40d5-491e-99b0-da01ff1f3341";

// Ensure environment variables are loaded
if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.SUPABASE_SERVICE_ROLE_KEY
) {
  console.warn(
    "Missing Supabase environment variables! Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
  );
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

const url = "https://www.levels.fyi/js/internshipData.json";

const InternshipSchema = z.object({
  company: z.string(),
  icon: z.string(),
  title: z.string(),
  yr: z.string(),
  loc: z.string(),
  monthlySalary: z.number().optional(),
  hourlySalary: z.number().optional(),
  moreInfo: z.string().optional(),
  link: z.url(),
  season: z.string().optional(),
  appNotOpen: z.boolean(),
});

const US_STATES = new Set([
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
  "DC",
]);

function isUSLocation(loc: string): boolean {
  if (!loc) return false;
  const lower = loc.toLowerCase();

  // Explicit US mentions
  if (
    lower.includes("united states") ||
    /\busa?\b/.test(lower) ||
    lower === "remote"
  ) {
    return true;
  }

  // Exclude some common non-US countries just in case
  const nonUS = [
    "canada",
    "uk",
    "united kingdom",
    "india",
    "germany",
    "france",
    "spain",
    "brazil",
    "mexico",
    "australia",
    "netherlands",
    "switzerland",
    "belgium",
    "italy",
    "romania",
    "poland",
    "japan",
    "china",
    "singapore",
    "ireland",
    "taiwan",
    "estonia",
  ];
  if (nonUS.some((c) => new RegExp(`\\b${c}\\b`).test(lower))) {
    return false;
  }

  // Check for US state abbreviations like ", CA" or " CA" or ", OH"
  const stateMatch = loc.match(/(?:,|\s)\s*([A-Z]{2})\b/);
  if (stateMatch && US_STATES.has(stateMatch[1])) {
    return true;
  }

  return false;
}

export async function runScraper() {
  const response = await fetch(url);
  const data = await response.json();

  // To omit items that don't match the schema, we use safeParse and filter them out
  const parsedData = (Array.isArray(data) ? data : []).flatMap((item) => {
    const result = InternshipSchema.safeParse(item);
    if (result.success && isUSLocation(result.data.loc)) {
      return [result.data];
    }
    return [];
  });

  console.log(
    `Successfully parsed and filtered ${parsedData.length} US opportunities.`,
  );

  // Map to the Database schema for 'opportunities'
  const opportunitiesMap = new Map();

  parsedData.forEach((item) => {
    // Generate deterministic UUID to prevent duplicates
    const uniqueString = `${item.company}-${item.title}-${item.loc}-${item.season || "Unknown"}-${item.yr || "Unknown"}`;
    const id = uuidv5(uniqueString, NAMESPACE);

    if (opportunitiesMap.has(id)) {
      return; // Skip if we already mapped this exact opportunity
    }

    const tags = [];
    if (item.season) tags.push(item.season);
    if (item.yr) tags.push(item.yr);
    tags.push(item.appNotOpen ? "Closed" : "Open");

    // Parse out the hostname from the levels.fyi logo URL
    // Example format: "https://img.logo.dev/mitre.org?token=pk_Ez-J..."
    let logoUrl = null;
    if (item.icon) {
      try {
        const parsedUrl = new URL(item.icon);
        // Extract "mitre.org" from "/mitre.org"
        const domainPath = parsedUrl.pathname.replace(/^\/+/, "");
        if (domainPath) {
          logoUrl = `https://logos.hunter.io/${domainPath}`;
        }
      } catch (e) {
        // Fallback for weird URLs
        console.warn(
          `Could not parse icon URL for ${item.company}:`,
          item.icon,
        );
      }
    }

    opportunitiesMap.set(id, {
      id,
      company: item.company,
      title: item.title,
      location: item.loc,
      logo_emoji: logoUrl, // Replaced with hunter.io URL
      pay_hr: item.hourlySalary || null,
      pay_monthly: item.monthlySalary || null,
      type: "Internship", // Fixed: Only 'Internship' and 'New Grad' are allowed under opportunities_type_check
      tags,
      is_rolling: null, // No info mapped
      deadline: null, // No info mapped
      link: item.link || null, // Provided by the newly added Supabase migration
    });
  });

  const opportunities = Array.from(opportunitiesMap.values());
  console.log(
    `Deduplicated down to ${opportunities.length} unique opportunities.`,
  );

  // Bulk upsert into Supabase in chunks of 500 to avoid request payload limits
  const CHUNK_SIZE = 500;
  for (let i = 0; i < opportunities.length; i += CHUNK_SIZE) {
    const chunk = opportunities.slice(i, i + CHUNK_SIZE);

    console.log(
      `Upserting chunk ${Math.floor(i / CHUNK_SIZE) + 1} of ${Math.ceil(opportunities.length / CHUNK_SIZE)}...`,
    );

    const { error } = await supabase
      .from("opportunities")
      .upsert(chunk, { onConflict: "id" });

    if (error) {
      console.error("Error inserting data into Supabase:", error);
    }
  }

  console.log("Finished importing data.");
  return { success: true, count: opportunities.length };
}
