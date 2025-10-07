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
    <main className="h-full max-w-[1236px] px-6 py-4 mx-auto">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 text-ad-gray-medium font-medium"
      >
        <LeftArrowIcon /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_270px] lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_522px] gap-[48px] md:gap-[40px] lg:gap-[80px] items-start">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-bold text-2xl">Your Cart</h2>
            <div className="text-xl">{cartData.length} items</div>
          </div>
          <div className="flex flex-col">
            {cartData.map((c) => (
              <article
                key={c.id}
                className="px-4 py-5 md:grid md:grid-cols-[minmax(120px,150px)_auto_auto] md:gap-6 md:items-start lg:grid-cols-[256px_auto_auto] last:border-b-0 border-b-[0.5px] border-ad-stoke-secondary"
              >
                <div className="mb-4 grid grid-cols-[1fr_auto] md:grid-cols-1 items-start gap-3">
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
                  <button
                    className="md:hidden"
                    onClick={() => onRemoveGame(c.id)}
                  >
                    <CloseIcon />
                  </button>
                </div>
                <div>
                  <p className="mb-3 flex justify-between items-center text-neutral-500 font-bold">
                    {c.genre}
                  </p>
                  <h3 className="mb-2 text-ad-gray-medium font-bold">
                    <span className="mr-2">{c.name}</span>
                    {c.isNew && (
                      <div className="inline-block bg-blue-600 text-sm text-gray-100 p-1 rounded-lg">
                        is new
                      </div>
                    )}
                  </h3>
                  <p className="mb-6 text-neutral-500">{c.description}</p>
                  <p className="text-right text-lg font-bold">${c.price}</p>
                </div>
                <button
                  className="hidden md:block"
                  onClick={() => onRemoveGame(c.id)}
                >
                  <CloseIcon />
                </button>
              </article>
            ))}
          </div>
        </div>

        {cartData.length > 0 && (
          <div>
            <article className="px-4 py-6 border border-ad-stoke-secondary rounded-2xl">
              <h3 className="mb-3 font-bold text-xl">Order Summary</h3>
              <p className="mb-[44px]">3 items</p>
              <ul className="flex flex-col gap-3">
                {cartData.map((c) => (
                  <li key={c.id} className="grid grid-cols-[1fr_auto] text-lg">
                    <div>{c.name}</div>
                    <div>$ {c.price.toFixed(2)}</div>
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
                    .reduce((a, c): number => a + c, 0)
                    .toFixed(2)}
                </div>
              </div>
            </article>
            <Button variant="solid" className="w-full mt-10 md:mt-8">
              Checkout
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
