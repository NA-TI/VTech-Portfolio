import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch projects' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data 
    });
  } catch (error) {
    console.error('Projects API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Require authentication for creating projects
    const session = await requireAuth(request);
    if (!session) {
      console.error('Authentication failed: No valid session');
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    console.log('Authentication successful for user:', session.username);

    const body = await request.json();
    const { 
      title, 
      description, 
      category, 
      image_url, 
      live_url, 
      github_url, 
      technologies, 
      featured 
    } = body;

    // Validate required fields
    if (!title || !description || !category) {
      return NextResponse.json(
        { success: false, error: 'Title, description, and category are required' },
        { status: 400 }
      );
    }

    // Validate category
    if (!['web', 'graphics', '3d'].includes(category)) {
      return NextResponse.json(
        { success: false, error: 'Category must be one of: web, graphics, 3d' },
        { status: 400 }
      );
    }

    // Prepare project data
    const projectData = {
      title: title.trim(),
      description: description.trim(),
      category,
      image_url: image_url || null,
      live_url: live_url || null,
      github_url: github_url || null,
      technologies: Array.isArray(technologies) ? technologies : [],
      featured: featured || false,
    };

    console.log('Attempting to insert project data:', projectData);

    const { data, error } = await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    console.log('Project created successfully:', data);

    return NextResponse.json({ 
      success: true, 
      data,
      message: 'Project created successfully' 
    });
  } catch (error) {
    console.error('Projects API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 