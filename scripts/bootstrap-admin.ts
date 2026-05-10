import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(process.cwd(), ".env.local"),
});

async function main() {
    if (process.env.DISABLE_API_ROUTES === "true") {
        console.log("admin bootstrap is disabled...");
        return;
    }
    const uid = process.env.BOOTSTRAP_ADMIN_UID;
    // dynamic import happens AFTER dotenv
    const { knowmusiqAdminAuth } = await import("../dist/lib/knowmusiqAdmin");
    console.log("Loaded ENV:", {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.slice(0, 20) + "...",
        uid: process.env.BOOTSTRAP_ADMIN_UID
    });

    if (!uid) {
        console.error("Missing BOOTSTRAP_ADMIN_UID");
        process.exit(1);
    }

    console.log("Setting admin role for:", uid);

    await knowmusiqAdminAuth.setCustomUserClaims(uid, {
        admin: true,
        tagEditor: true,
    });

    console.log("Admin bootstrap complete.");
}

main();
