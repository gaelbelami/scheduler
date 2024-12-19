import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
export function AuthModal() {
  return (
   <Dialog>
    <DialogTrigger>
        <Button>Try for free</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[360px]">
        <DialogHeader className="flex flex-row items-center gap-2">
            <Image src="/logo.png" alt="logo" width={50} height={50} />
            <DialogTitle className="text-3xl font-semibold">Saha</DialogTitle>
        </DialogHeader>
    </DialogContent>
   </Dialog>
  );
}