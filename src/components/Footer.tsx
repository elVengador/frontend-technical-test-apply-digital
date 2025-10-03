import React from "react";
import { ApplyLogo } from "./icons/ApplyLogo";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full h-[172px] bg-neutral-700 grid place-items-center">
      <Link href="/">
        <ApplyLogo />
      </Link>
    </footer>
  );
};
