import React from "react";
import { CartIcon } from "./icons/CartIcon";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full h-16 p-6 lg:p-0 lg:max-w-[1106px] flex justify-between items-center bg-[#EEEEEE]">
      <Link href="/" className="font-bold text-2xl text-[#585660]">
        GamerShop
      </Link>
      <Link href="/cart">
        <CartIcon />
      </Link>
    </header>
  );
};
