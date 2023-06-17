import Link from "next/link";
import { SignIn } from "@/components/SignIn";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default () => {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "link", size: "sm" }), "self-start -mt-20")}
        >
          Go home
        </Link>
        <SignIn />
      </div>
    </div>
  );
};
