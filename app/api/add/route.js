import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("linknest");
    const collection = db.collection("links");

    // Validate required fields
    if (!body.clerkId || !body.handle || !body.links) {
      return Response.json({
        success: false,
        error: true,
        message: "Missing required fields",
      });
    }

    const formattedHandle = body.handle
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9-_]/g, "");

    body.handle = formattedHandle;

    // Check if handle is used by another user
    const handleTaken = await collection.findOne({
      handle: formattedHandle,
      clerkId: { $ne: body.clerkId }, // not the current user
    });

    if (handleTaken) {
      return Response.json({
        success: false,
        error: true,
        message: "Handle is already taken",
      });
    }

    // Update or insert
    const result = await collection.updateOne(
      { clerkId: body.clerkId }, // find by Clerk user ID
      { $set: body },
      { upsert: true }
    );

    return Response.json({
      success: true,
      error: false,
      message: "Linknest saved successfully",
      result,
    });
  } catch (err) {
    console.error("Error saving Linknest:", err);
    return Response.json({
      success: false,
      error: true,
      message: "Server error. Please try again.",
    });
  }
}
