'use client'
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";


interface iAppProps {
    text:string;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    className?: string;
}


export function SubmitButton({text, variant, className}: iAppProps) {
    const {pending} = useFormStatus()
    return <>
        {pending ? <Button disabled variant="outline" className={cn("w-fit", className )}><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait</Button> : <Button type="submit" variant={variant} className={cn("w-fit", className )}>{text}</Button>}
    </>
}


export function GoogleAuthButton() {
    const {pending} = useFormStatus();
    return (
        <>{pending ? (<Button disabled variant="outline" className="w-full"> <Loader2 className="w-4 h-4 animate-spin"/> </Button>) : (<Button variant="outline" className="w-full">
            <Image src="/google.svg" alt="google" width={20} height={20} className="mr-2" />
            Sign in with Google
        </Button>)}</>
    )
}


export function GithubAuthButton() {
    const {pending} = useFormStatus();
    return (
        <>{pending ? (<Button disabled variant="outline" className="w-full"> <Loader2 className="w-4 h-4 animate-spin"/> </Button>) : (<Button variant="outline" className="w-full">
            <Image src="/github.svg" alt="github" width={20} height={20} className="mr-2" />
            Sign in with github
        </Button>)}</>
    )
}

