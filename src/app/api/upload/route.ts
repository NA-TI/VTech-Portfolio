import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create a Supabase client with service role key for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseServiceKey!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Helper function to extract filename from Supabase URL
function extractFilenameFromUrl(url: string): string | null {
  try {
    // Supabase URLs typically look like: https://xxx.supabase.co/storage/v1/object/public/media/folder/filename.jpg
    const urlParts = url.split("/");
    const mediaIndex = urlParts.findIndex((part) => part === "media");
    if (mediaIndex !== -1 && mediaIndex + 1 < urlParts.length) {
      // Return everything after 'media/' including the folder structure
      return urlParts.slice(mediaIndex + 1).join("/");
    }
    return null;
  } catch (error) {
    console.error("Error extracting filename from URL:", error);
    return null;
  }
}

// Helper function to delete old image
async function deleteOldImage(oldImageUrl: string): Promise<void> {
  try {
    const filename = extractFilenameFromUrl(oldImageUrl);
    if (!filename) {
      console.log("Could not extract filename from URL:", oldImageUrl);
      return;
    }

    console.log("Attempting to delete old image:", filename);

    const { error } = await supabase.storage.from("media").remove([filename]);

    if (error) {
      console.error("Error deleting old image:", error);
    } else {
      console.log("Successfully deleted old image:", filename);
    }
  } catch (error) {
    console.error("Error in deleteOldImage:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      console.error("Supabase not configured");
      return NextResponse.json(
        {
          error:
            "File upload not configured. Please set up Supabase environment variables.",
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "uploads";
    const oldImageUrl = formData.get("oldImageUrl") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop();
    const fileName = `${folder}/${timestamp}-${Math.random().toString(36).substring(2)}.${fileExtension}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("Attempting to upload file:", fileName, "to Supabase storage");

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("media")
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);

      // Check if it's a bucket not found error
      if (
        error.message?.includes("bucket") ||
        error.message?.includes("not found")
      ) {
        return NextResponse.json(
          {
            error:
              "Storage bucket 'media' not found. Please create a 'media' bucket in your Supabase project.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: `Failed to upload file: ${error.message}` },
        { status: 500 }
      );
    }

    console.log("File uploaded successfully:", data);

    // Delete old image if provided and it's a Supabase URL
    if (oldImageUrl && oldImageUrl.includes("supabase.co")) {
      await deleteOldImage(oldImageUrl);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("media")
      .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      fileName: fileName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: `Internal server error: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}
