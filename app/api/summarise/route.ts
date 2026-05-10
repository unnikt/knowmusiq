import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const { text } = await req.json();
    console.log("Summarise?")
    if (!text) {
        return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const prompt = `Summarise the following Carnatic raga description in 3–4 sentences.Keep it musical, clear, and emotionally expressive.
    Text:${text}`;

    const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    });

    const summary = completion.choices[0].message.content;

    return NextResponse.json({ summary });
}
