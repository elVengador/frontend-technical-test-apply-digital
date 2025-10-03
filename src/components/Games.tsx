"use client";

import { GetGamesOutput } from "@/app/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Game } from "@/utils/endpoint";
import { capitalizeFirstLetter } from "@/utils/string.utils";
import { PipeIcon } from "./icons/PipeIcon";
import { Select } from "./Select";
import { getGames } from "@/repository/games.repository";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type GamesProps = { data: GetGamesOutput };
export const Games = ({ data }: GamesProps) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filteredGames, setFilteredGames] = useState<Game[]>(data.games);
  const [loading, setLoading] = useState(false);
  const [_, setCart] = useLocalStorage({ key: "AD_CART", initialValue: "" });

  const onAddToCart = (game: Game) => {
    try {
      setCart((p) => {
        if (!p) return JSON.stringify([game]);

        const previousCart = JSON.parse(p) as Game[];
        const existElement = previousCart.find((cur) => cur.id === game.id);
        if (existElement) return p;

        return JSON.stringify(Array.from(new Set([...previousCart, game])));
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const onSyncFilteredGames = async () => {
      try {
        console.log("selectedFilter", selectedFilter);
        if (!selectedFilter) return setFilteredGames(data.games);

        setLoading(true);
        const newFilteredGames = await getGames(selectedFilter);
        setFilteredGames(newFilteredGames.games);
        setLoading(false);
      } catch (error) {
        console.error();
        setLoading(false);
      }
    };
    onSyncFilteredGames();
  }, [data.games, selectedFilter]);

  return (
    <div>
      <div className="px-6 py-8">
        <h1>TOP SELLERS</h1>
        <div className="flex justify-between items-center gap-6">
          <div className="font-bold text-[#3B3B3B]">Genre</div>
          <PipeIcon />
          <Select
            label={selectedFilter}
            options={data.availableFilters.map((c) => ({
              label: capitalizeFirstLetter(c),
              value: c,
            }))}
            fnChange={setSelectedFilter}
          />
        </div>
      </div>
      <div className="w-full p-6 flex flex-wrap gap-6 border-t-[1px] border-t-[#EFEDF3]">
        {loading &&
          [1, 2, 3, 4].map((c) => (
            <div
              key={c}
              className="w-full h-[400px] rounded-2xl bg-neutral-400  animate-pulse"
            ></div>
          ))}
        {!loading && filteredGames.length === 0 && (
          <div>
            There are not games with the selected filter yet, try again later
          </div>
        )}
        {!loading &&
          filteredGames.map((c) => (
            <article
              key={c.id}
              className="w-full p-6 flex flex-col gap-5 rounded-2xl border-[0.5px] border-[#8F8F8F]"
            >
              <div className="relative h-[240px] rounded-t-6">
                <Image
                  src={c.image}
                  alt={c.description}
                  className="rounded-t-3xl"
                  fill
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-[#737373] font-bold text-base">
                  {c.genre}
                </div>
                <div className="flex justify-between">
                  <h2 className="font-bold text-lg text-ad-gray-medium">
                    {c.name}
                  </h2>
                  <div className="font-bold text-xl text-ad-gray-medium">
                    ${c.price}
                  </div>
                </div>
              </div>
              <button
                onClick={() => onAddToCart(c)}
                className="p-5 w-full rounded font-bold border text-ad-gray-medium hover:bg-[#585660] hover:text-[#fff] hover:bg-"
              >
                ADD TO CART
              </button>
            </article>
          ))}
      </div>
    </div>
  );
};
