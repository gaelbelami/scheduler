import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { nylas, nylasConfig } from "@/app/lib/nylas";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    const session = await requireUser();
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
        return Response.json({ error: "No code provided" }, { status: 400 });
    }

    try {
        const response = await nylas.auth.exchangeCodeForToken({
            clientId: nylasConfig.clientId,
            clientSecret: nylasConfig.apiKey,
            redirectUri: nylasConfig.redirectUri,
            code: code,
        });

        const {grantId, email} = response
        await prisma.user.update({
            where: {
                id: session?.user?.id
            },
            data: {
                grantID: grantId,
                grantEmail: email,
            }
        })
    } catch (error) {
        console.log("Error exchanging code for token", error);
    }

    redirect("/dashboard");
}