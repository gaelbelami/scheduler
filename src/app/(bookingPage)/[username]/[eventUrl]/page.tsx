import { Calendar } from "@/app/components/bookingForm/Calendar";
import { RenderCalendar } from "@/app/components/bookingForm/RenderCalendar";
import prisma from "@/app/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import { notFound } from "next/navigation";


async function getData(eventUrl: string, username: string) {
    const data = await prisma.eventType.findFirst({
        where: {
            url: eventUrl,
            user: {
                username: username
            },
            active: true,
        },
        select: {
            id: true,
            title: true,
            description: true,
            duration: true,
            videoCallSoftware: true,
            user: {
                select: {
                    image: true,
                    username: true,
                    name: true,
                    Availability: {
                        select: {
                            day: true,
                            isActive: true,
                        }
                    }
                }
            }
        }
    })

    if (!data) {
        return notFound();
    }
    return data;
}

export default async function BookingFormRoute({params, searchParams} : {params: {username: string; eventUrl: string}; searchParams: {date?: string}}) {
    
    const data = await getData(params.eventUrl, params.username);
    const selectedDate = searchParams.date ? new Date(searchParams.date) : new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}).format(selectedDate);
    return (
        <div className="min-h-screen w-screen flex items-center justify-center"> 
            <Card>
                <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4">
                    <div>
                        <img src={data.user?.image as string} alt="User profile image" className="w-10 h-10 rounded-full" />
                        <p className="text-sm font-medium text-muted-foreground mt-1" >
                            {data.user?.name}
                        </p>
                        <h1 className="text-xl font-semibold mt-2">
                            {data.title}
                        </h1>
                        <p className="text-sm font-medium text-muted-foreground">
                            {data.description}
                        </p>
                        <div className="mt-5 flex flex-col gap-y-4">
                            <p className="flex items-center">
                                <CalendarX2 className="w-4 h-4 mr-2 text-primary inline-block" />
                                <span className="text-sm font-medium text-muted-foreground">{formattedDate}</span>
                            </p>
                            <p className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-primary inline-block" />
                                <span className="text-sm font-medium text-muted-foreground">{data.duration} minutes</span>
                            </p>
                            <p className="flex items-center">
                                <VideoIcon className="w-4 h-4 mr-2 text-primary inline-block" />
                                <span className="text-sm font-medium text-muted-foreground">{data.videoCallSoftware}</span>
                            </p>
                        </div>
                    </div>
                    <Separator orientation="vertical" className="h-full w-[1px]" />
                    <RenderCalendar availability={data.user?.Availability as any} />
                    <Separator orientation="vertical" className="h-full w-[1px]" />
                </CardContent>
            </Card>
        </div>
    )
}