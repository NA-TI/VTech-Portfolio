const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables:");
  console.error("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "Set" : "Missing");
  console.error(
    "SUPABASE_SERVICE_ROLE_KEY:",
    supabaseServiceKey ? "Set" : "Missing"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupStorage() {
  console.log("🚀 Setting up Supabase Storage...\n");

  try {
    // Create media bucket
    console.log("📦 Creating media bucket...");
    const { data: mediaBucket, error: mediaError } =
      await supabase.storage.createBucket("media", {
        public: true,
        allowedMimeTypes: [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ],
        fileSizeLimit: 5242880, // 5MB
      });

    if (mediaError) {
      if (mediaError.message.includes("already exists")) {
        console.log("✅ Media bucket already exists");
      } else {
        console.error("❌ Error creating media bucket:", mediaError.message);
      }
    } else {
      console.log("✅ Media bucket created successfully");
    }

    // Create avatars bucket
    console.log("📦 Creating avatars bucket...");
    const { data: avatarsBucket, error: avatarsError } =
      await supabase.storage.createBucket("avatars", {
        public: true,
        allowedMimeTypes: [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ],
        fileSizeLimit: 5242880, // 5MB
      });

    if (avatarsError) {
      if (avatarsError.message.includes("already exists")) {
        console.log("✅ Avatars bucket already exists");
      } else {
        console.error(
          "❌ Error creating avatars bucket:",
          avatarsError.message
        );
      }
    } else {
      console.log("✅ Avatars bucket created successfully");
    }

    // Create projects bucket
    console.log("📦 Creating projects bucket...");
    const { data: projectsBucket, error: projectsError } =
      await supabase.storage.createBucket("projects", {
        public: true,
        allowedMimeTypes: [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ],
        fileSizeLimit: 5242880, // 5MB
      });

    if (projectsError) {
      if (projectsError.message.includes("already exists")) {
        console.log("✅ Projects bucket already exists");
      } else {
        console.error(
          "❌ Error creating projects bucket:",
          projectsError.message
        );
      }
    } else {
      console.log("✅ Projects bucket created successfully");
    }

    console.log("\n🎉 Storage setup completed!");
    console.log("\n📋 Next steps:");
    console.log("1. Make sure your Supabase project has storage enabled");
    console.log("2. Set up RLS policies if needed");
    console.log("3. Test the upload functionality in your admin panel");
  } catch (error) {
    console.error("❌ Setup failed:", error);
    process.exit(1);
  }
}

setupStorage();
