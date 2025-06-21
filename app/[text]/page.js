import { redirect, notFound } from "next/navigation";
import clientPromise from "../lib/mongodb";

export default async function Page(params) {
    const client = await clientPromise;
    const db = client.db("Cliplink");
    const collection = db.collection("links");

    const result = await collection.findOne({ text: params.params.text });

    if (!result) {
        notFound();
    }

    redirect(result.url);
}
