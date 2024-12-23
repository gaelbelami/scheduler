import { Button } from "@/components/ui/button";
import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
    title?: string;
    description?: string;
    buttonText: string;
    href: string;
}

export function EmptyState( { title, description, buttonText, href }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full rounded-md border border-dashed p-8 text-center animate-in fade-in-50
        "><div className="flex items-center justify-center space-y-4 w-20 h-20 rounded-full bg-primary/10">
            <Ban className="w-12 h-12 text-primary" />
        </div>
            <h2 className="mt-6 text-xl font-semibold">{title}</h2>
            <p className="mb-8 mt-2 text-sm text-muted-foreground max-w-xs mx-auto">{description}</p>
            <Button asChild>
                <Link href={href}> <PlusCircle className="mr-2 h-4 w-4" /> {buttonText}</Link>
            </Button>

        </div>
    )
}