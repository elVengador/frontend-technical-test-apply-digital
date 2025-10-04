"use client";

import { Button } from "@/components/Button";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { LeftArrowIcon } from "@/components/icons/LeftArrowIcon";
import { LOCAL_STORAGE_KEY_CART } from "@/constants";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Game } from "@/utils/endpoint";
import { deleteObjectProperty } from "@/utils/object.utils";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default function Cart() {
  const [cart, setCart] = useLocalStorage<Record<string, Game>>({
    key: LOCAL_STORAGE_KEY_CART,
  });

  const cartData: Game[] = useMemo(() => {
    try {
      return Object.values(cart);
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [cart]);

  const onRemoveGame = (id: string) => {
    try {
      const hasConfirm = confirm("Are you sure you want to remove the game?");
      if (!hasConfirm) return;
      setCart((prev) => deleteObjectProperty(prev, id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="px-6 py-4">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 text-ad-gray-medium font-medium"
      >
        <LeftArrowIcon /> Back to Catalog
      </Link>

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
                <button onClick={() => onRemoveGame(c.id)}>
                  <CloseIcon />
                </button>
              </div>
              <p className="mb-3 flex justify-between items-center text-neutral-500 font-bold">
                {c.genre}
              </p>
              <h3 className="mb-2 text-ad-gray-medium font-bold">
                {c.name}
                {c.isNew && (
                  <span className="ml-2 bg-blue-600 text-sm text-gray-100 p-1 rounded-lg">
                    is new
                  </span>
                )}
              </h3>
              <p className="mb-6 text-neutral-500">{c.description}</p>
              <p className="text-right text-lg">${c.price}</p>
            </article>
          ))}
        </div>
      </div>

      {cartData.length > 0 && (
        <>
          <article className="px-4 py-6 mt-12 border border-ad-stoke-secondary rounded-2xl">
            <h3 className="mb-3 font-bold text-xl">Order Summary</h3>
            <p className="mb-[44px]">3 items</p>
            <ul className="flex flex-col gap-3">
              {cartData.map((c) => (
                <li
                  key={c.id}
                  className="flex justify-between items-center text-lg"
                >
                  <div>{c.name}</div>
                  <div>$ {c.price}</div>
                </li>
              ))}
            </ul>
            <hr className="my-6 border-b-[0.5px] border-b-ad-stoke-secondary" />
            <div className="mb-5 flex justify-between items-center font-bold text-xl">
              <div>Order Total</div>
              <div>
                ${" "}
                {cartData
                  .map((c) => c.price)
                  .reduce((a, c): number => a + c, 0)}
              </div>
            </div>
          </article>
          <Button variant="solid" className="w-full mt-10">
            Checkout
          </Button>
        </>
      )}
    </main>
  );
}
