"use client";

import { CloseIcon } from "@/components/icons/CloseIcon";
import { LeftArrowIcon } from "@/components/icons/LeftArrowIcon";
import { LOCAL_STORAGE_KEY_CART } from "@/constants";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Game } from "@/utils/endpoint";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default function Cart() {
  const [cart] = useLocalStorage({
    key: LOCAL_STORAGE_KEY_CART,
    initialValue: "",
  });

  const cartData: Game[] = useMemo(() => {
    try {
      if (!cart) return [];
      return JSON.parse(cart);
    } catch (error) {
      console.error(error);
    }
  }, [cart]);

  return (
    <main className="">
      <div className="px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-ad-gray-medium font-medium"
        >
          <LeftArrowIcon /> Back to Catalog
        </Link>
      </div>
      <div className="px-6 py-8 flex flex-col gap-8">
        <div>
          <h2 className="font-bold text-2xl">Your Cart</h2>
          <div className="text-xl">{cartData.length} items</div>
        </div>
        <div className="flex flex-col">
          {cartData.map((c) => (
            <article
              key={c.id}
              className="px-4 py-5 last:border-b-0 border-b-[0.5px] border-ad-stoke-secondary"
            >
              <div className="mb-4 grid grid-cols-[1fr_auto] items-start gap-3">
                <Image
                  src={c.image}
                  alt={c.description}
                  width={259}
                  height={136}
                  style={{
                    width: "259px",
                    height: "136px",
                    objectFit: "cover",
                  }}
                />
                <button>
                  <CloseIcon />
                </button>
              </div>
              <p className="mb-3 text-neutral-500 font-bold">{c.genre}</p>
              <h3 className="mb-2 text-ad-gray-medium font-bold">{c.name}</h3>
              <p className="mb-6 text-neutral-500">{c.description}</p>
              <p className="text-right text-lg">${c.price}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
