"use server"

import prisma from "./lib/db"
import { requireUser } from "./lib/hooks";
import { parseWithZod } from "@conform-to/zod"
import { onboardingSchema, settingsSchema } from "./lib/zodSchemas";
import { redirect } from "next/navigation";
import { create } from "domain";
import { revalidatePath } from "next/cache";

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
            Availability: {
                createMany: {
                   data: [
                    {
                        day: "Monday",
                        fromTime: "08:00",
                        tillTime: "18:00",
                    },
                    {
                        day: "Tuesday",
                        fromTime: "08:00",
                        tillTime: "18:00",
                    },
                    {
                        day: "Wednesday",
                        fromTime: "08:00",
                        tillTime: "18:00",
                    },
                    {
                        day: "Thursday",
                        fromTime: "08:00",
                        tillTime: "18:00",
                    },
                    {
                        day: "Friday",
                        fromTime: "08:00",
                        tillTime: "18:00",
                    },
                    {
                        day: "Saturday",
                        fromTime: "08:00",
                        tillTime: "18:00",
                    },
                    {
                        day: "Sunday",
                        fromTime: "08:00",
                        tillTime: "18:00",
                    }
                   ]
                },               

            }
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


export async function updateAvailabilityAction(formData: FormData) {
    const session = await requireUser();
  
    const rawData = Object.fromEntries(formData.entries());
    const availabilityData = Object.keys(rawData)
      .filter((key) => key.startsWith("id-"))
      .map((key) => {
        const id = key.replace("id-", "");
        return {
          id,
          isActive: rawData[`isActive-${id}`] === "on",
          fromTime: rawData[`fromTime-${id}`] as string,
          tillTime: rawData[`tillTime-${id}`] as string,
        };
      });
  
    try {
      await prisma.$transaction(
        availabilityData.map((item) =>
          prisma.availability.update({
            where: { id: item.id },
            data: {
              isActive: item.isActive,
              fromTime: item.fromTime,
              tillTime: item.tillTime,
            },
          })
        )
      );
  
      revalidatePath("/dashboard/availability");
      return { status: "success", message: "Availability updated successfully" };
    } catch (error) {
      console.error("Error updating availability:", error);
      return { status: "error", message: "Failed to update availability" };
    }
  }