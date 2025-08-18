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

async function cleanupDatabase() {
  console.log("🧹 Cleaning up database...\n");

  try {
    // Drop fun_interests table
    console.log("🗑️  Dropping fun_interests table...");
    const { error: dropError } = await supabase.rpc("exec_sql", {
      sql: "DROP TABLE IF EXISTS fun_interests CASCADE;",
    });

    if (dropError) {
      console.error(
        "❌ Error dropping fun_interests table:",
        dropError.message
      );
    } else {
      console.log("✅ fun_interests table dropped successfully");
    }

    // Drop related policies and indexes
    console.log("🗑️  Cleaning up related policies and indexes...");
    const cleanupQueries = [
      'DROP POLICY IF EXISTS "Allow public read access" ON fun_interests;',
      'DROP POLICY IF EXISTS "Allow authenticated insert" ON fun_interests;',
      'DROP POLICY IF EXISTS "Allow authenticated update" ON fun_interests;',
      "DROP INDEX IF EXISTS idx_fun_interests_order;",
    ];

    for (const query of cleanupQueries) {
      const { error } = await supabase.rpc("exec_sql", { sql: query });
      if (error) {
        console.log(`⚠️  Warning: ${error.message}`);
      }
    }

    console.log("\n🎉 Database cleanup completed!");
    console.log("\n📋 Summary:");
    console.log("• Removed fun_interests table");
    console.log("• Cleaned up related policies and indexes");
    console.log("• Database is now clean and optimized");
  } catch (error) {
    console.error("❌ Cleanup failed:", error);
    process.exit(1);
  }
}

cleanupDatabase();
