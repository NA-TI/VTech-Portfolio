import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_ID = '4e9ec204-81ee-4f8b-8410-6a0fe5ad18b6'; // TODO: Replace with your real admin UUID

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', ADMIN_ID)
      .maybeSingle();
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    // If profile not found yet, return success with null data
    return NextResponse.json({ success: true, data: data ?? null });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      title, 
      bio, 
      avatar_url, 
      email, 
      location, 
      social_links, 
      skills, 
      experience_years, 
      available_for_projects,
      styled_words
    } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData = {
      name: name.trim(),
      title: title ? title.trim() : null,
      bio: bio ? bio.trim() : null,
      avatar_url: avatar_url || null,
      email: email.trim().toLowerCase(),
      location: location ? location.trim() : null,
      social_links: social_links || {},
      skills: Array.isArray(skills) ? skills : [],
      experience_years: experience_years ? parseInt(experience_years) : 0,
      available_for_projects: available_for_projects !== undefined ? available_for_projects : true,
      styled_words: styled_words || [],
      updated_at: new Date().toISOString(),
    };

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', ADMIN_ID)
      .single();

    let result;
    if (existingProfile) {
      // Update existing profile
      result = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', ADMIN_ID)
        .select()
        .single();
    } else {
      // Create new profile
      result = await supabase
        .from('profiles')
        .insert({ ...updateData, id: ADMIN_ID })
        .select()
        .single();
    }

    if (result.error) {
      console.error('Supabase error:', result.error);
      return NextResponse.json(
        { success: false, error: result.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Profile updated successfully',
      data: result.data 
    });
  } catch (error) {
    console.error('Profile API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 