import { NextRequest, NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Lazy init Supabase admin client only when env vars are present
function getAdminClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  try {
    return createClient(url, key);
  } catch (e) {
    console.error("Failed to init Supabase client:", e);
    return null;
  }
}

interface SiteSettings {
  // Branding
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;

  // SEO
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;

  // Contact
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;

  // Social Media
  socialLinks: {
    linkedin: string;
    github: string;
    twitter: string;
    instagram: string;
  };

  // Admin
  adminEmail: string;
  enableNotifications: boolean;
  autoBackup: boolean;
}

// Default settings used when database or env is not configured
const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "VTech Portfolio",
  siteDescription: "Professional portfolio and services",
  logo: "",
  favicon: "",
  primaryColor: "#3B82F6",
  secondaryColor: "#10B981",
  metaTitle: "VTech Portfolio - Professional Development Services",
  metaDescription:
    "Professional web development, mobile apps, and AI solutions",
  metaKeywords: "web development, mobile apps, AI, portfolio",
  ogImage: "",
  contactEmail: "",
  contactPhone: "",
  contactAddress: "",
  socialLinks: {
    linkedin: "",
    github: "",
    twitter: "",
    instagram: "",
  },
  adminEmail: "",
  enableNotifications: true,
  autoBackup: true,
};

// Helpers to map API <-> DB shapes
function toDb(settings: SiteSettings) {
  return {
    site_name: settings.siteName,
    site_description: settings.siteDescription,
    logo: settings.logo,
    favicon: settings.favicon,
    primary_color: settings.primaryColor,
    secondary_color: settings.secondaryColor,
    meta_title: settings.metaTitle,
    meta_description: settings.metaDescription,
    meta_keywords: settings.metaKeywords,
    og_image: settings.ogImage,
    contact_email: settings.contactEmail,
    contact_phone: settings.contactPhone,
    contact_address: settings.contactAddress,
    social_links: settings.socialLinks,
    admin_email: settings.adminEmail,
    enable_notifications: settings.enableNotifications,
    auto_backup: settings.autoBackup,
  } as const;
}

function fromDb(row: any): SiteSettings {
  return {
    siteName: row?.site_name ?? "VTech Portfolio",
    siteDescription:
      row?.site_description ?? "Professional portfolio and services",
    logo: row?.logo ?? "",
    favicon: row?.favicon ?? "",
    primaryColor: row?.primary_color ?? "#3B82F6",
    secondaryColor: row?.secondary_color ?? "#10B981",
    metaTitle:
      row?.meta_title ?? "VTech Portfolio - Professional Development Services",
    metaDescription:
      row?.meta_description ??
      "Professional web development, mobile apps, and AI solutions",
    metaKeywords:
      row?.meta_keywords ?? "web development, mobile apps, AI, portfolio",
    ogImage: row?.og_image ?? "",
    contactEmail: row?.contact_email ?? "",
    contactPhone: row?.contact_phone ?? "",
    contactAddress: row?.contact_address ?? "",
    socialLinks: row?.social_links ?? {
      linkedin: "",
      github: "",
      twitter: "",
      instagram: "",
    },
    adminEmail: row?.admin_email ?? "",
    enableNotifications: row?.enable_notifications ?? true,
    autoBackup: row?.auto_backup ?? true,
  };
}

// GET - Retrieve settings
export async function GET(request: NextRequest) {
  try {
    // Publicly readable: settings are non-sensitive site configuration

    // Get settings from database
    const admin = getAdminClient();
    if (!admin) {
      const payload = DEFAULT_SETTINGS;
      return NextResponse.json({ success: true, data: payload });
    }

    const { data, error } = await admin
      .from("site_settings")
      .select("*")
      .single();

    // Treat "not found" and "relation does not exist" as empty settings
    if (error && error.code !== "PGRST116" && error.code !== "42P01") {
      // PGRST116 is "not found"
      console.error("Database error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch settings" },
        { status: 500 }
      );
    }

    // Return default settings if none exist
    const payload = data ? fromDb(data) : DEFAULT_SETTINGS;
    return NextResponse.json({ success: true, data: payload });
  } catch (error) {
    console.error("Settings GET error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update settings
export async function PUT(request: NextRequest) {
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
    const settings: SiteSettings = body;

    // Validate required fields
    if (!settings.siteName || !settings.siteDescription) {
      return NextResponse.json(
        { success: false, error: "Site name and description are required" },
        { status: 400 }
      );
    }

    // Check if settings exist
    const admin = getAdminClient();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Server not configured for settings storage" },
        { status: 500 }
      );
    }

    const { data: existingSettings } = await admin
      .from("site_settings")
      .select("id")
      .single();

    let result;
    if (existingSettings) {
      // Update existing settings
      result = await admin
        .from("site_settings")
        .update(toDb(settings))
        .eq("id", existingSettings.id)
        .select()
        .single();
    } else {
      // Insert new settings
      result = await admin
        .from("site_settings")
        .insert(toDb(settings))
        .select()
        .single();
    }

    if (result.error) {
      console.error("Database error:", result.error);
      return NextResponse.json(
        { success: false, error: "Failed to save settings" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: fromDb(result.data),
      message: "Settings updated successfully",
    });
  } catch (error) {
    console.error("Settings PUT error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
