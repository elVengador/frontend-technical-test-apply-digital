import React from "react";
import { CartIcon } from "./icons/CartIcon";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full h-16  lg:p-0 bg-[#EEEEEE]">
      <div className="h-full max-w-[1236px] p-6 mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-2xl text-[#585660]">
          GamerShop
        </Link>
        <Link href="/cart">
          <CartIcon />
        </Link>
      </div>
    </header>
  );
};
