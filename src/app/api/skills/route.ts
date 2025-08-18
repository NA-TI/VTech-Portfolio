import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requireAuth } from "@/lib/auth";

// Force dynamic rendering for this route
export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Require authentication for creating skills
    const session = await requireAuth(request);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, category, icon, color, proficiency } = body;
    if (!name || !category || proficiency === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, category, and proficiency are required",
        },
        { status: 400 }
      );
    }
    const { data, error } = await supabase
      .from("skills")
      .insert([
        {
          name,
          category,
          icon,
          color,
          proficiency,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();
    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
