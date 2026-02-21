import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

// POST - Create or remove a claim
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { itemId, claimType, action } = body; // claimType: 'found' or 'match', action: 'add' or 'remove'

    if (!itemId || !claimType || !action) {
      return NextResponse.json(
        { error: "Item ID, claim type, and action are required" },
        { status: 400 },
      );
    }

    if (action === "add") {
      // Add claim
      const claimData =
        claimType === "found"
          ? {
              found_item_id: itemId,
              user_id: session.user.id,
              claim_type: "found",
            }
          : {
              lost_item_id: itemId,
              user_id: session.user.id,
              claim_type: "match",
            };

      const { data: claim, error: claimError } = await supabase
        .from("claims")
        .insert([claimData])
        .select()
        .single();

      if (claimError) {
        console.error("Error creating claim:", claimError);
        return NextResponse.json(
          { error: "Failed to create claim" },
          { status: 500 },
        );
      }

      // Update the item's claim/match count
      const tableName = claimType === "found" ? "found_items" : "lost_items";
      const columnName = claimType === "found" ? "claims" : "matches";

      const { error: updateError } = await supabase.rpc("increment_count", {
        table_name: tableName,
        item_id: itemId,
        column_name: columnName,
      });

      // If RPC doesn't work, fallback to manual update
      if (updateError) {
        const { data: item } = await supabase
          .from(tableName)
          .select(columnName)
          .eq("id", itemId)
          .single();

        if (item) {
          await supabase
            .from(tableName)
            .update({ [columnName]: item[columnName] + 1 })
            .eq("id", itemId);
        }
      }

      return NextResponse.json(
        { message: "Claim added successfully", data: claim },
        { status: 201 },
      );
    } else {
      // Remove claim
      const whereClause =
        claimType === "found"
          ? {
              found_item_id: itemId,
              user_id: session.user.id,
            }
          : {
              lost_item_id: itemId,
              user_id: session.user.id,
            };

      const { error: deleteError } = await supabase
        .from("claims")
        .delete()
        .match(whereClause);

      if (deleteError) {
        console.error("Error removing claim:", deleteError);
        return NextResponse.json(
          { error: "Failed to remove claim" },
          { status: 500 },
        );
      }

      // Update the item's claim/match count
      const tableName = claimType === "found" ? "found_items" : "lost_items";
      const columnName = claimType === "found" ? "claims" : "matches";

      const { data: item } = await supabase
        .from(tableName)
        .select(columnName)
        .eq("id", itemId)
        .single();

      if (item && item[columnName] > 0) {
        await supabase
          .from(tableName)
          .update({ [columnName]: item[columnName] - 1 })
          .eq("id", itemId);
      }

      return NextResponse.json(
        { message: "Claim removed successfully" },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("Error in POST /api/items/claims:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// GET - Fetch user's claims
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("claims")
      .select("*")
      .eq("user_id", session.user.id);

    if (error) {
      console.error("Error fetching claims:", error);
      return NextResponse.json(
        { error: "Failed to fetch claims" },
        { status: 500 },
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/items/claims:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
