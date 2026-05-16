import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";
import { slugify } from "@/lib/string/slugify";

export const runtime = "edge";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    const slug = slugify(params.slug);

    const snap = await knowmusiqAdminDB
        .collection("ragas")
        .where("slug", "==", slug)
        .limit(1)
        .get();

    if (snap.empty) {
        return new ImageResponse(
            (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
                        color: "white",
                        fontSize: 80,
                        fontWeight: "bold",
                    }}
                >
                    Raga Not Found
                </div>
            ),
            { width: 1200, height: 630 }
        );
    }

    const raga = snap.docs[0].data();

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    padding: "60px",
                    background:
                        "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
                    color: "#111",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ fontSize: 90, fontWeight: "bold" }}> {raga.name} </div>

                < div style={{ marginTop: 20, fontSize: 42 }}>
                    Arohana: {raga.arohana}
                </div>
                < div style={{ fontSize: 42 }}>
                    Avarohana: {raga.avarohana}
                </div>

                {
                    raga.parent && (
                        <div style={{ marginTop: 20, fontSize: 38 }}>
                            Parent Raga: {raga.parent}
                        </div>
                    )}

                <div
                    style={
                        {
                            marginTop: "auto",
                            fontSize: 32,
                            opacity: 0.7,
                        }
                    }
                >
                    musiq - me.com
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
