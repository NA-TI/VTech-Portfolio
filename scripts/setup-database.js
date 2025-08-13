#!/usr/bin/env node

/**
 * Database Setup and Test Script
 * This script will help you set up your Supabase database and test the connection
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

console.log('🔧 Database Setup and Test Script\n');

// Environment variables are already loaded by Next.js
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.log('❌ Missing required environment variables:');
  console.log('   - NEXT_PUBLIC_SUPABASE_URL');
  console.log('   - SUPABASE_SERVICE_ROLE_KEY');
  console.log('\nPlease check your .env.local file');
  process.exit(1);
}

console.log('✅ Environment variables loaded');
console.log(`📡 Supabase URL: ${supabaseUrl}`);

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testConnection() {
  console.log('\n🔗 Testing database connection...');
  
  try {
    // Test basic connection
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      console.log('❌ Database connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Database connection successful!');
    return true;
  } catch (err) {
    console.log('❌ Database connection error:', err.message);
    return false;
  }
}

async function checkTables() {
  console.log('\n📋 Checking database tables...');
  
  const tables = ['profiles', 'projects', 'skills', 'contact_messages'];
  const missingTables = [];
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('count').limit(1);
      
      if (error) {
        console.log(`❌ Table '${table}': ${error.message}`);
        missingTables.push(table);
      } else {
        console.log(`✅ Table '${table}': Exists`);
      }
    } catch (err) {
      console.log(`❌ Table '${table}': ${err.message}`);
      missingTables.push(table);
    }
  }
  
  return missingTables;
}

async function setupDatabase() {
  console.log('\n🔧 Setting up database schema...');
  
  try {
    // Read schema file
    const schemaPath = path.join(__dirname, '..', 'sql', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('📄 Schema file loaded');
    console.log('⚠️  Please run the following SQL in your Supabase SQL Editor:');
    console.log('\n' + '='.repeat(50));
    console.log(schema);
    console.log('='.repeat(50));
    
    console.log('\n📝 Instructions:');
    console.log('1. Go to your Supabase dashboard');
    console.log('2. Navigate to SQL Editor');
    console.log('3. Copy and paste the schema above');
    console.log('4. Click "Run" to execute');
    
  } catch (err) {
    console.log('❌ Error reading schema file:', err.message);
  }
}

async function insertSampleData() {
  console.log('\n📊 Checking for sample data...');
  
  try {
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (profilesError) {
      console.log('❌ Error checking profiles:', profilesError.message);
      return;
    }
    
    if (profiles && profiles.length > 0) {
      console.log('✅ Sample data already exists');
    } else {
      console.log('⚠️  No sample data found');
      console.log('📝 Please run the sample-data.sql script in Supabase SQL Editor');
    }
    
  } catch (err) {
    console.log('❌ Error checking sample data:', err.message);
  }
}

async function main() {
  console.log('🚀 Starting database setup...\n');
  
  // Test connection
  const connected = await testConnection();
  
  if (!connected) {
    console.log('\n❌ Cannot proceed without database connection');
    console.log('Please check your Supabase credentials and try again');
    return;
  }
  
  // Check tables
  const missingTables = await checkTables();
  
  if (missingTables.length > 0) {
    console.log(`\n⚠️  Missing tables: ${missingTables.join(', ')}`);
    await setupDatabase();
  } else {
    console.log('\n✅ All tables exist!');
  }
  
  // Check sample data
  await insertSampleData();
  
  console.log('\n🎉 Database setup complete!');
  console.log('\n📝 Next steps:');
  console.log('1. If tables were missing, run the schema in Supabase SQL Editor');
  console.log('2. If no sample data, run sample-data.sql in Supabase SQL Editor');
  console.log('3. Test your application: npm run dev');
  console.log('4. Deploy to production: Set environment variables in Vercel');
}

main().catch(console.error); 