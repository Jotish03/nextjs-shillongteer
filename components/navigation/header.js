import React from "react";
import DarkModeToggle from "../dark-mode-toggle";
import { Button } from "../ui/button";
import Link from "next/link";

const NavigationBar = () => {
  return (
    <main className="flex items-center justify-around mt-10 ">
      <Link href={"/"}>
        <div className="font-bold uppercase">Shillong Teer</div>
      </Link>

      <div className="flex items-center">
        <Button variant="outline" className="mr-2">
          Login
        </Button>
        <DarkModeToggle />
      </div>
    </main>
  );
};

export default NavigationBar;
