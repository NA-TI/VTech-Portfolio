import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Initialize Supabase client with admin credentials
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface ActivityLog {
  id: string;
  action: string;
  description: string;
  entity_type:
    | "project"
    | "skill"
    | "content"
    | "profile"
    | "message"
    | "settings"
    | "system";
  entity_id?: string;
  user_id: string;
  user_name: string;
  created_at: string;
  metadata?: any;
}

// GET - Retrieve activity logs
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await requireAuth(request);
    if (!authResult) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");
    const entityType = searchParams.get("entity_type");
    const action = searchParams.get("action");

    // Build query
    let query = supabaseAdmin
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (entityType) {
      query = query.eq("entity_type", entityType);
    }
    if (action) {
      query = query.eq("action", action);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch activity logs" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data || [],
    });
  } catch (error) {
    console.error("Activity GET error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create activity log (used by other API routes)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await requireAuth(request);
    if (!authResult) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, description, entity_type, entity_id, metadata } = body;

    // Validate required fields
    if (!action || !description || !entity_type) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create activity log
    const activityLog: Partial<ActivityLog> = {
      action,
      description,
      entity_type,
      entity_id,
      user_id: authResult.username, // Use username as user_id
      user_name: authResult.username || "Admin",
      metadata,
    };

    const { data, error } = await supabaseAdmin
      .from("activity_logs")
      .insert(activityLog)
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to create activity log" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Activity POST error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
