import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const clerkId = searchParams.get("clerkId");

  try {
    const client = await clientPromise;
    const db = client.db("linknest");
    const collection = db.collection("links");

    const userDoc = await collection.findOne({ clerkId });

    if (!userDoc) {
      return Response.json({ success: false, message: "No Linknest found" });
    }

    return Response.json({ success: true, result: userDoc });
  } catch (err) {
    console.error("Error fetching user Linknest:", err);
    return Response.json({ success: false, message: "Error fetching data" });
  }
}
