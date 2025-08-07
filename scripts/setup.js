#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');

console.log('🎨 Portfolio Template Setup');
console.log('==========================\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function setupProject() {
  try {
    console.log('📝 Let\'s set up your portfolio...\n');
    
    // Collect personal information
    const personalInfo = await collectPersonalInfo();
    
    // Guide through Supabase setup
    const supabaseInfo = await setupSupabase();
    
    // Configure environment variables
    await configureEnvironment(personalInfo, supabaseInfo);
    
    // Update project files with personal info
    await updateProjectFiles(personalInfo);
    
    console.log('\n✅ Setup complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Run "npm install" to install dependencies');
    console.log('2. Run "npm run dev" to start your portfolio');
    console.log('3. Visit http://localhost:3000 to see your portfolio');
    console.log('4. Check the docs/SETUP.md file for detailed instructions');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

async function collectPersonalInfo() {
  return new Promise((resolve) => {
    const questions = [
      { key: 'name', question: 'What is your name? ' },
      { key: 'title', question: 'What is your professional title? (e.g., Creative Designer) ' },
      { key: 'bio', question: 'Write a short bio about yourself: ' },
      { key: 'email', question: 'What is your email? ' },
      { key: 'location', question: 'Where are you located? ' },
      { key: 'github', question: 'GitHub username? ' },
      { key: 'linkedin', question: 'LinkedIn profile URL? ' },
      { key: 'twitter', question: 'Twitter handle? (optional, press Enter to skip) ' },
      { key: 'behance', question: 'Behance profile URL? (optional, press Enter to skip) ' },
      { key: 'dribbble', question: 'Dribbble profile URL? (optional, press Enter to skip) ' }
    ];
    
    const answers = {};
    let currentQuestion = 0;
    
    function askQuestion() {
      const q = questions[currentQuestion];
      rl.question(q.question, (answer) => {
        answers[q.key] = answer.trim();
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
          askQuestion();
        } else {
          resolve(answers);
        }
      });
    }
    
    askQuestion();
  });
}

async function setupSupabase() {
  console.log('\n🗄️ Database Setup');
  console.log('==================');
  console.log('You\'ll need to create a Supabase project for your portfolio.');
  console.log('Follow these steps:\n');
  
  console.log('1. Go to https://supabase.com');
  console.log('2. Sign up/Login and create a new project');
  console.log('3. Choose a name for your project (e.g., "my-portfolio")');
  console.log('4. Set a database password');
  console.log('5. Choose a region close to you');
  console.log('6. Wait for the project to be created\n');
  
  return new Promise((resolve) => {
    rl.question('Press Enter when you\'ve created your Supabase project...', () => {
      console.log('\nNow let\'s get your Supabase credentials:\n');
      
      const supabaseQuestions = [
        { key: 'url', question: 'Supabase URL (from Project Settings > API): ' },
        { key: 'anonKey', question: 'Supabase Anon Key (from Project Settings > API): ' },
        { key: 'serviceKey', question: 'Supabase Service Role Key (from Project Settings > API): ' }
      ];
      
      const answers = {};
      let currentQuestion = 0;
      
      function askSupabaseQuestion() {
        const q = supabaseQuestions[currentQuestion];
        rl.question(q.question, (answer) => {
          answers[q.key] = answer.trim();
          currentQuestion++;
          
          if (currentQuestion < supabaseQuestions.length) {
            askSupabaseQuestion();
          } else {
            resolve(answers);
          }
        });
      }
      
      askSupabaseQuestion();
    });
  });
}

async function configureEnvironment(personalInfo, supabaseInfo) {
  console.log('\n⚙️ Configuring environment variables...');
  
  const envContent = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=${supabaseInfo.url}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseInfo.anonKey}
SUPABASE_SERVICE_ROLE_KEY=${supabaseInfo.serviceKey}

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=

# Email Configuration (optional - for contact form)
RESEND_API_KEY=
FROM_EMAIL=${personalInfo.email}

# Admin Configuration
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Google Site Verification (optional)
GOOGLE_SITE_VERIFICATION=
`;

  fs.writeFileSync('.env.local', envContent);
  console.log('✅ Created .env.local file');
}

async function updateProjectFiles(personalInfo) {
  console.log('\n📝 Updating project files with your information...');
  
  // Update package.json
  const packagePath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  packageJson.name = `${personalInfo.name.toLowerCase().replace(/\s+/g, '-')}-portfolio`;
  packageJson.description = `${personalInfo.name}'s Portfolio - ${personalInfo.title}`;
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  
  console.log('✅ Updated package.json');
  
  // Create personal info config file
  const configContent = `// Personal Information Configuration
// Update this file with your information

export const personalInfo = {
  name: "${personalInfo.name}",
  title: "${personalInfo.title}",
  bio: "${personalInfo.bio}",
  email: "${personalInfo.email}",
  location: "${personalInfo.location}",
  avatar: "/avatar.jpg",
  available: true,
  social: {
    github: "${personalInfo.github ? `https://github.com/${personalInfo.github}` : ''}",
    linkedin: "${personalInfo.linkedin || ''}",
    twitter: "${personalInfo.twitter ? `https://twitter.com/${personalInfo.twitter}` : ''}",
    behance: "${personalInfo.behance || ''}",
    dribbble: "${personalInfo.dribbble || ''}"
  },
  skills: [
    "Web Development",
    "Graphics Design", 
    "3D Visualization",
    "UI/UX Design"
  ]
};
`;

  fs.writeFileSync(path.join(__dirname, '..', 'src', 'config', 'personal-info.ts'), configContent);
  console.log('✅ Created personal info configuration');
}

setupProject(); 