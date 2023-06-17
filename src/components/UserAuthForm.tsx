"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/Button";
import { useState } from "react";
import { Icons } from "./Icons";
import { type BuiltInProviderType } from "next-auth/providers";
import { type SignInOptions, signIn } from "next-auth/react";

export const UserAuthForm = () => {
  const { toast } = useToast();
  const [isLoading, setLoading] = useState(false);

  const signInWrapper = (provider: BuiltInProviderType, options?: SignInOptions) => {
    try {
      setLoading(true);
      signIn(provider, options);
    } catch (error) {
      console.error(error);
      toast({
        title: "There was a problem.",
        description: "There was an error logging you in with Google.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Button size="sm" isLoading={isLoading} onClick={() => signInWrapper("google")}>
        {!isLoading && <Icons.google className="w-4 h-4 -ml-2 mr-2" />}
        Google
      </Button>
    </div>
  );
};
