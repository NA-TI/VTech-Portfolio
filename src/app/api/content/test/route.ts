import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

// Initialize Supabase client with admin credentials
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Testing content connection...");

    // Test database connection
    const { data: testData, error: testError } = await supabaseAdmin
      .from("site_content")
      .select("*")
      .limit(1);

    if (testError) {
      console.error("❌ Database connection failed:", testError);
      return NextResponse.json({
        success: false,
        error: "Database connection failed",
        details: testError.message,
      });
    }

    console.log("✅ Database connection successful");

    // Test content fetch
    const { data: content, error: contentError } = await supabaseAdmin
      .from("site_content")
      .select("content_data, version, updated_at")
      .eq("content_key", "main")
      .single();

    if (contentError) {
      console.error("❌ Content fetch failed:", contentError);
      return NextResponse.json({
        success: false,
        error: "Content fetch failed",
        details: contentError.message,
        availableTables: testData,
      });
    }

    if (!content) {
      console.log("⚠️ No content found in database");
      return NextResponse.json({
        success: false,
        error: "No content found",
        message: "No content with key 'main' found in database",
      });
    }

    console.log("✅ Content found:", {
      version: content.version,
      updated_at: content.updated_at,
      hasData: !!content.content_data,
    });

    return NextResponse.json({
      success: true,
      message: "Content connection working",
      data: {
        version: content.version,
        updated_at: content.updated_at,
        hasData: !!content.content_data,
        sampleData: content.content_data
          ? {
              hero: content.content_data.homepage?.hero,
              company: content.content_data.company,
            }
          : null,
      },
    });
  } catch (error) {
    console.error("❌ Test endpoint error:", error);
    return NextResponse.json({
      success: false,
      error: "Test failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
