import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { groupSize, intensityTier } = body;

    if (!groupSize || !intensityTier) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Insert or update user in matchmaking queue
    const { error } = await supabase
      .from('matchmaking_queue')
      .upsert({ 
        user_id: user.id, 
        group_size: groupSize, 
        intensity_tier: intensityTier,
        status: 'searching'
      });

    if (error) throw error;

    return NextResponse.json({ success: true, message: "Joined queue" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase
      .from('matchmaking_queue')
      .delete()
      .eq('user_id', user.id);

    if (error) throw error;

    return NextResponse.json({ success: true, message: "Left queue" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
