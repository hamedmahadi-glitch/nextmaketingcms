import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/directus/api";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    // If Directus is disabled, serve the mock settings file directly
    if (process.env.DISABLE_DIRECTUS === "1") {
      try {
        const mockPath = path.resolve(process.cwd(), "src/lib/directus/mock/settings.json");
        const txt = await fs.readFile(mockPath, "utf8");
        const obj = JSON.parse(txt);
        return NextResponse.json(obj || {});
      } catch (err) {
        console.warn("DISABLE_DIRECTUS is set but mock settings not found:", err);
        // fall back to library call
      }
    }

    const settings = await getSiteSettings();
    return NextResponse.json(settings || {});
  } catch (error) {
    console.error("/api/directus/site-settings error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}
