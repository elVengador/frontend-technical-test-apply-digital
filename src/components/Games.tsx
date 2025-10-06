"use client";

import { GetGamesOutput } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Game } from "@/utils/endpoint";
import { capitalizeFirstLetter } from "@/utils/string.utils";
import { PipeIcon } from "./icons/PipeIcon";
import { Select } from "./Select";
import { getGames } from "@/repository/games.repository";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "./Button";
import { LOCAL_STORAGE_KEY_CART } from "@/constants";
import { deleteObjectProperty } from "@/utils/object.utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type GamesMap = { [key: string]: Game };
type GamesProps = { data: GetGamesOutput; genre: string };
export const Games = ({ data, genre }: GamesProps) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [cart, setCart] = useLocalStorage<GamesMap>({
    key: LOCAL_STORAGE_KEY_CART,
  });
  const [currentPage, setCurrentPage] = useState(data.currentPage);
  const [allGames, setAllGames] = useState<Game[]>(data.games);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChangeFilter = (genre: string) => {
    try {
      console.log({ genre });
      const params = new URLSearchParams(searchParams.toString());
      genre ? params.set("genre", genre) : params.delete("genre");
      router.push(`${pathname}?${params.toString()}`);
    } catch (error) {
      console.error(error);
    }
  };

  const onRemoveGameToCart = (id: string) => {
    try {
      const hasConfirm = confirm("Are you sure you want to remove the game?");
      if (!hasConfirm) return;
      setCart((prev) => deleteObjectProperty(prev, id));
    } catch (error) {
      console.error(error);
    }
  };

  const onSeeMore = async () => {
    try {
      setLoadingMore(true);

      const moreGames = await getGames(genre, currentPage + 1);
      console.log({ moreGames });
      setAllGames((prev) => [...prev, ...moreGames.games]);
      setCurrentPage(moreGames.currentPage);
      setLoadingMore(false);
    } catch (error) {
      console.error(error);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    console.log({ data });
    setAllGames(data.games);
    setCurrentPage(data.currentPage);
  }, [data]);

  return (
    <main>
      <div className="px-6 py-8">
        <h1 className="bold text-2xl">TOP SELLERS</h1>
        <div className="flex justify-between items-center gap-6">
          <div className="font-bold text-[#3B3B3B]">Genre</div>
          <PipeIcon />
          <Select
            label={genre ?? "All"}
            options={data.availableFilters.map((c) => ({
              label: capitalizeFirstLetter(c),
              value: c,
            }))}
            fnChange={onChangeFilter}
          />
        </div>
      </div>
      <div className="w-full p-6 flex flex-wrap gap-6 border-t-[1px] border-t-[#EFEDF3]">
        {allGames.length === 0 && (
          <div>
            There are not games with the selected filter yet, try again later
          </div>
        )}
        {allGames.map((cur) => (
          <article
            key={cur.id}
            className="w-full p-6 flex flex-col gap-5 rounded-2xl border-[0.5px] border-ad-stoke-secondary"
          >
            <div className="relative h-[240px] rounded-t-6">
              <Image
                src={cur.image}
                alt={cur.description}
                className="rounded-t-3xl"
                fill
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-[#737373] font-bold text-base">
                {cur.genre}
              </div>
              <div className="flex justify-between">
                <h2 className="font-bold text-lg text-ad-gray-medium">
                  {cur.name}
                </h2>
                <div className="font-bold text-xl text-ad-gray-medium">
                  ${cur.price}
                </div>
              </div>
            </div>
            {cart[cur.id] && (
              <Button onClick={() => onRemoveGameToCart(cur.id)}>Remove</Button>
            )}
            {!cart[cur.id] && (
              <Button
                onClick={() => setCart((prev) => ({ ...prev, [cur.id]: cur }))}
              >
                Add to cart
              </Button>
            )}
          </article>
        ))}
      </div>
      {currentPage < data.totalPages && (
        <div className="p-6">
          {loadingMore && <div className="text-center">Loading...</div>}
          {!loadingMore && (
            <Button onClick={onSeeMore} variant="solid" className="w-full">
              SEE MORE
            </Button>
          )}
        </div>
      )}
    </main>
  );
};
