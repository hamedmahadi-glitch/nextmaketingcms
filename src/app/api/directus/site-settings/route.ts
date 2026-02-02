import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/directus/api";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json(settings || {});
  } catch (error) {
    console.error("/api/directus/site-settings error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}
