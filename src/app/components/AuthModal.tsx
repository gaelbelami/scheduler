import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { signIn } from "../lib/auth";
import { GithubAuthButton, GoogleAuthButton } from "./SubmitButtons";
export function AuthModal() {
  return (
   <Dialog>
    <DialogTrigger>
        <Button>Try for free</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[360px]">
        <DialogHeader className="flex flex-row justify-center items-center gap-2">
            <Image src="/logo.png" alt="logo" width={50} height={50} />
            <DialogTitle className="text-3xl font-semibold">Scheduler</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col mt-5 gap-3">
            <form action={async  () => {"use server" 
                await signIn("google")
            }}><GoogleAuthButton /></form>
           <form action={async  () => {"use server" 
                await signIn("github")
            }}><GithubAuthButton /></form>
        </div>
    </DialogContent>
   </Dialog>
  );
}