import React from "react";
import DarkModeToggle from "../dark-mode-toggle";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Profile from "../profile";

const NavigationBar = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const handleLoginButtonRoute = () => {
    router.push("/user-auth/user-login");
  };

  return (
    <main className="flex items-center justify-around mt-10">
      <Link href={"/"}>
        <div className="font-bold uppercase">Shillong Teer</div>
      </Link>

      <div className="flex items-center gap-2">
        {!session && (
          <Button
            type="button"
            variant="outline"
            className="mr-2"
            onClick={handleLoginButtonRoute}
          >
            Login
          </Button>
        )}
        {session && (
          <>
            <Profile />
          </>
        )}
        <DarkModeToggle />
      </div>
    </main>
  );
};

export default NavigationBar;
