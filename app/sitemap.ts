import { MetadataRoute } from "next";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://knowmusic.web.app";

    // Fetch dynamic pages (ragas, krithis, artists, etc.)
    const ragasSnap = await knowmusiqAdminDB.collection("ragas").get();
    const ragas = ragasSnap.docs.map((doc) => ({
        url: `${baseUrl}/ragas/${doc.id}`,
        lastModified: new Date(),
    }));

    const krithisSnap = await knowmusiqAdminDB.collection("krithis").get();
    const krithis = krithisSnap.docs.map((doc) => ({
        url: `${baseUrl}/krithis/${doc.id}`,
        lastModified: new Date(),
    }));

    // Add static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/ragas`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/krithis`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/videos`,
            lastModified: new Date(),
        },
    ];

    return [...staticPages, ...ragas, ...krithis];
}
