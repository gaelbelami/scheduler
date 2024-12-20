import Image from "next/image";
import Link from "next/link"
import { AuthModal } from "./AuthModal";

export function Navbar() {
  return (
    <div className="flex py-5 items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={50} height={50} />
            <h4 className="text-3xl font-semibold text-secondary">Saha</h4>
        </Link>

      <AuthModal />
        
    </div>
  );
}