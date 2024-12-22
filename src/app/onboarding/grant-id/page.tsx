import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck2 } from "lucide-react";
// import VideoGif from'@/public/work-is-almost-over-happy.gif";
import Image from "next/image";
import Link from "next/link";
export default function OnboardingRouteTwo() {
    return <div className="min-h-screen w-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>
                        You are almost done
                    </CardTitle>
                    <CardDescription>
                        We have to now connect your calendar to your account
                    </CardDescription>
                    <Image src="/onboarding.gif" alt="work-is-almost-over-happy" className="w-full rounded-lg" width={50} height={50}/>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full">
                        <Link href="/api/auth"> <CalendarCheck2 className="w-4 h-4 mr-2" /> Connect Calendar to your account</Link>
                    </Button>
                </CardContent>
            </Card>
    </div>
}