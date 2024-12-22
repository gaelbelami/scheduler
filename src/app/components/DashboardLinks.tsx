'use client';
import { cn } from "@/lib/utils";
import { CalendarCheck, HomeIcon, LucideProps, Settings, Users2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface navigationProps {
    id: number;
    name: string;
    href: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export const dashboardLinks: navigationProps[] = [
   {
    id: 0,
    name: "Event Types",
    href: "/dashboard",
    icon: HomeIcon,
   },
   {
    id: 1,
    name: "Meetings",
    href: "/dashboard/meetings",
    icon: Users2,
   },
   {
    id: 2,
    name: "Availability",
    href: "/dashboard/availability",
    icon: CalendarCheck,
   },
   {
    id: 3,
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
   }
];

export function DashboardLinks() {
    const pathname = usePathname()
    return (
        <>
        {dashboardLinks.map((link) => (
            <Link key={link.id} href={link.href} className={cn("flex items-center gap-3 px-3 py-2  rounded-lg  hover:text-primary transition-all", pathname === link.href ? "bg-primary/10 text-primary" : "text-muted-foreground")}>
                <link.icon size={16} className="h-5 w-5"/>
                <p className="text-sm font-medium">{link.name}</p>  
            </Link> 
        ))}
        </>
    )
}