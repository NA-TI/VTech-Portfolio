const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Helper function to extract filename from Supabase URL
function extractFilenameFromUrl(url) {
  try {
    const urlParts = url.split("/");
    const mediaIndex = urlParts.findIndex((part) => part === "media");
    if (mediaIndex !== -1 && mediaIndex + 1 < urlParts.length) {
      return urlParts.slice(mediaIndex + 1).join("/");
    }
    return null;
  } catch (error) {
    console.error("Error extracting filename from URL:", error);
    return null;
  }
}

// Helper function to delete old image
async function deleteOldImage(oldImageUrl) {
  try {
    const filename = extractFilenameFromUrl(oldImageUrl);
    if (!filename) {
      console.log("Could not extract filename from URL:", oldImageUrl);
      return false;
    }

    console.log("Attempting to delete old image:", filename);

    const { error } = await supabase.storage.from("media").remove([filename]);

    if (error) {
      console.error("Error deleting old image:", error);
      return false;
    } else {
      console.log("Successfully deleted old image:", filename);
      return true;
    }
  } catch (error) {
    console.error("Error in deleteOldImage:", error);
    return false;
  }
}

// Test function
async function testImageCleanup() {
  console.log("🧪 Testing Image Cleanup Functionality...\n");

  // Test URL extraction
  console.log("1. Testing URL extraction:");
  const testUrl =
    "https://xxx.supabase.co/storage/v1/object/public/media/logos/1703123456789-abc123.jpg";
  const extractedFilename = extractFilenameFromUrl(testUrl);
  console.log(`   Test URL: ${testUrl}`);
  console.log(`   Extracted filename: ${extractedFilename}`);
  console.log(`   Expected: logos/1703123456789-abc123.jpg`);
  console.log(
    `   ✅ ${extractedFilename === "logos/1703123456789-abc123.jpg" ? "PASS" : "FAIL"}\n`
  );

  // Test with invalid URL
  console.log("2. Testing invalid URL:");
  const invalidUrl = "https://example.com/image.jpg";
  const invalidFilename = extractFilenameFromUrl(invalidUrl);
  console.log(`   Invalid URL: ${invalidUrl}`);
  console.log(`   Extracted filename: ${invalidFilename}`);
  console.log(`   ✅ ${invalidFilename === null ? "PASS" : "FAIL"}\n`);

  // List current files in media bucket
  console.log("3. Current files in media bucket:");
  try {
    const { data: files, error } = await supabase.storage
      .from("media")
      .list("", { limit: 100 });

    if (error) {
      console.error("   Error listing files:", error);
    } else {
      console.log(`   Found ${files.length} files:`);
      files.forEach((file) => {
        console.log(
          `   - ${file.name} (${file.metadata?.size || "unknown size"} bytes)`
        );
      });
    }
  } catch (error) {
    console.error("   Error accessing storage:", error);
  }

  console.log("\n✅ Image cleanup test completed!");
  console.log("\n📝 Notes:");
  console.log(
    "- The cleanup logic will only delete files from Supabase storage"
  );
  console.log("- External URLs (like CDN links) will be ignored");
  console.log(
    "- Only files uploaded through the FileUpload component will be cleaned up"
  );
}

// Run the test
testImageCleanup().catch(console.error);
