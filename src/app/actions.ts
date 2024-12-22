"use server"

import prisma from "./lib/db"
import { requireUser } from "./lib/hooks";
import { parseWithZod } from "@conform-to/zod"
import { onboardingSchema, settingsSchema } from "./lib/zodSchemas";
import { redirect } from "next/navigation";

export async function OnbordingActions( prevState: any,  formData: FormData) {
    const session = await requireUser();
    const submission = await parseWithZod(formData, {
        schema: onboardingSchema({
            async isUsernameUnique(){
                const existingUsername = await prisma.user.findUnique({
                    where: {
                        username: formData.get("username") as string,
                    }
                });

                return !existingUsername;
            }
        }),
        async: true
    })
    
    if(submission.status !== "success") {
        return submission.reply();
    }
    const data  = await prisma.user.update({
        where: {
            id: session?.user?.id
        },
        data: {
            username:submission.value.username,
            name: submission.value.fullname,
        }
    })
    redirect("/onboarding/grant-id")
}

export async function SettingsActions(prevState: any, formData: FormData) {
    const session = await requireUser();
    const submission = await parseWithZod(formData, {
        schema: settingsSchema,
        async: true
    })
    
    if(submission.status !== "success") {
        return submission.reply();
    }
    const data  = await prisma.user.update({
        where: {
            id: session?.user?.id
        },
        data: {
            name: submission.value.fullname,
            image: submission.value.profileImage
        }
    })
    redirect("/dashboard")
}