import clientPromise from "@/app/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("Cliplink");
        const collection = db.collection("links");

        const data = await collection.find({}).toArray();

        return Response.json(data);

    } catch (err) {
        console.error(err);
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("Cliplink", "links")
        const collection = db.collection("links")

        // parse the JSON body
        const body = await request.json();
        const body2 = {
            ...body,
            time: new Date()
        };

        const result = await collection.insertOne(body2);

        return Response.json({ insertedId: result.insertedId });



    } catch (err) {
        console.error("POST Error:", err);
        return new Response("Error inserting document", { status: 500 });
    }

}
export async function DELETE(request) {
    try {
        const client = await clientPromise;
        const db = client.db("Cliplink", "links")
        const collection = db.collection("links")
        const body = await request.json();

        const result = await collection.deleteOne({text: body.text})

        if (result.deletedCount === 0) {
            return new Response("Document not found", { status: 404 });
        }

        return Response.json({ success: true, deletedText: body.text });


    } catch (err) {
        console.error("DELETE Error:", err);
        return new Response("Error deleting document", { status: 500 });
    }

}