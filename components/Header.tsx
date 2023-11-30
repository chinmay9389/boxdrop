import React from "react";
import Link from "next/link";
import Image from "next/image";
import { UserButton, SignedOut, SignInButton } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggler";

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <div className="bg-[#0160FE] w-fit">
          <Image
            src="https://www.shareicon.net/download/2016/07/13/606936_dropbox_2048x2048.png"
            className="invert"
            alt="logo"
            height={50}
            width={50}
          ></Image>
        </div>
        <h1 className="font-bold text-xl">Boxdrop</h1>
      </Link>

      <div className="px-5 space-x-2 flex items-center">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />

        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
