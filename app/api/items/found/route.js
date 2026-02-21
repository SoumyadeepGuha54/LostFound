import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

// POST - Create a new found item
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { itemName, location, description, imageUrl } = body;

    if (!itemName || !location) {
      return NextResponse.json(
        { error: "Item name and location are required" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("found_items")
      .insert([
        {
          user_id: session.user.id,
          college: session.user.college,
          item_name: itemName,
          location: location,
          description: description || "",
          image_url: imageUrl || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating found item:", error);
      return NextResponse.json(
        { error: "Failed to create found item" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Found item posted successfully", data },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in POST /api/items/found:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// GET - Fetch found items (filtered by college)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "100");

    // Only fetch items from the same college with user information
    const { data, error } = await supabase
      .from("found_items")
      .select(
        `
        *,
        users:user_id (
          name
        )
      `,
      )
      .eq("college", session.user.college)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching found items:", error);
      return NextResponse.json(
        { error: "Failed to fetch found items" },
        { status: 500 },
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/items/found:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
