import { NextResponse } from "next/server";
import { runScraper } from "@/lib/scrape";

export async function GET() {
  try {
    const result = await runScraper();
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Unexpected scraping error:", err);
    return NextResponse.json(
      { error: "Unexpected scraping error", details: err.message },
      { status: 500 },
    );
  }
}
