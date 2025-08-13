#!/usr/bin/env node

/**
 * Environment Variables Test Script
 * Run this to verify your environment variables are set correctly
 */

console.log('🔍 Testing Environment Variables...\n');

// Check required environment variables
const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_SITE_URL',
  'JWT_SECRET',
  'ADMIN_USERNAME',
  'ADMIN_PASSWORD'
];

const optionalVars = [
  'RESEND_API_KEY',
  'FROM_EMAIL',
  'NEXT_PUBLIC_GA_ID',
  'GOOGLE_SITE_VERIFICATION'
];

console.log('📋 Required Variables:');
let allRequiredPresent = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`❌ ${varName}: MISSING`);
    allRequiredPresent = false;
  }
});

console.log('\n📋 Optional Variables:');
optionalVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`⚠️  ${varName}: Not set (optional)`);
  }
});

console.log('\n🔗 Testing Supabase Connection...');

if (allRequiredPresent) {
  const { createClient } = require('@supabase/supabase-js');
  
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    
    // Test connection by fetching a simple query
    supabase.from('profiles').select('count').limit(1)
      .then(({ data, error }) => {
        if (error) {
          console.log('❌ Database connection failed:', error.message);
        } else {
          console.log('✅ Database connection successful!');
        }
      })
      .catch(err => {
        console.log('❌ Database connection error:', err.message);
      });
      
  } catch (error) {
    console.log('❌ Failed to create Supabase client:', error.message);
  }
} else {
  console.log('❌ Cannot test database connection - missing required variables');
}

console.log('\n📝 Next Steps:');
if (!allRequiredPresent) {
  console.log('1. Create a .env.local file with the required variables');
  console.log('2. Copy from env.example and fill in your actual values');
  console.log('3. For production, set these in Vercel Environment Variables');
} else {
  console.log('1. All required variables are set!');
  console.log('2. Test your application: npm run dev');
  console.log('3. Build for production: npm run build');
}

console.log('\n📚 See DEPLOYMENT_GUIDE.md for detailed instructions');

