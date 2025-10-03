import { GetGamesOutput } from "@/app/types";

export const getGames = async (genre: string = '', page: number = 1): Promise<GetGamesOutput> => {
    const res = await fetch(`http://localhost:3000/api/games?genre=${genre}&page=${page}`);
    const data = res.json();
    return data;
};