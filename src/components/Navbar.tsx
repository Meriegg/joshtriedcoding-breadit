import Link from "next/link";
import { getServerAuthSession } from "@/lib/next-auth";
import { buttonVariants } from "./ui/Button";
import { Icons } from "./Icons";

export const Navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="fixed top-0 inset-x-0 h-fit w-full bg-zinc-100 border-b border-zinc-300 z-10 py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <div>
          <Link href="/" className="flex gap-2 items-center">
            <Icons.logo className="w-8 h-8 sm:h-6 sm:w-6" />
            <p className="hidden text-zinc-700 text-sm font-medium md:block">Breadit</p>
          </Link>
        </div>
        {!session ? (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        ) : (
          <p>{session.user.username}</p>
        )}
      </div>
    </div>
  );
};
