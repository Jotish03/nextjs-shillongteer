import React from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Profile from "../profile";
import Image from "next/image";

const NavigationBar = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  return (
    <main className="flex items-center justify-between lg:justify-around p-4 bg-[#17a2b8] ">
      <div className="flex items-center">
        <Link href={"/"}>
          <Image
            src={"/images/logoold.png"}
            width={40}
            height={40}
            priority
            className="dark:invert"
            alt="logo"
          />
        </Link>
        <Link href={"/"}>
          <span className="text-center font-bold">MorningSundayTeer</span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {session && (
          <>
            <Profile />
          </>
        )}
      </div>
    </main>
  );
};

export default NavigationBar;
