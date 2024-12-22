import { SettingsForm } from "@/app/components/Settings";
import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { notFound } from "next/navigation";

async function getData(id:string){
    const data = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            name: true,
            email: true,
            username: true,
            image: true
        }
    });
    if(!data) {
        return notFound();
    }
    return data;
}

export default async function SettingsRoute() {
    const session = await requireUser();
    const data = await getData(session?.user?.id as string);
    return <div>
        <SettingsForm email={data.email} fullname={data.name  as string} profileImage={data.image as string} username={data.username  as string}/>
    </div>
}