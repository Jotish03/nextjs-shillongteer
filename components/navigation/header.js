import React from "react";
import DarkModeToggle from "../dark-mode-toggle";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

const NavigationBar = () => {
  const { data: session, status } = useSession();
  console.log(session);
  const router = useRouter();
  const handleLoginButtonRoute = () => {
    router.push("/user-auth/user-login");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    signOut();
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex items-center justify-around mt-10">
      <Link href={"/"}>
        <div className="font-bold uppercase">Shillong Teer</div>
      </Link>

      <div className="flex items-center">
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
            <p>Welcome {session.user.name}</p>
            {session.role && <p>{session.role}</p>} {/* Check if role exists */}
            <Button
              type="button"
              variant="outline"
              className="mr-2"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        )}
        <DarkModeToggle />
      </div>
    </main>
  );
};

export default NavigationBar;
