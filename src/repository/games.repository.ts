import { GetGamesOutput } from "@/app/types";

export const getGames = async (genre: string = '', page: number = 1): Promise<GetGamesOutput> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/games?genre=${genre}&page=${page}`);
    const data = res.json();
    return data;
};