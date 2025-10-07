import { GetGamesOutput } from "@/types";

const isProd = process.env.NODE_ENV === 'production';
export const API_URI = isProd
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
    : 'http://localhost:3000/api';

export const getGames = async (genre: string = '', page: number = 1): Promise<GetGamesOutput> => {
    const fullUrl = `${API_URI}/games?genre=${genre}&page=${page}`
    console.log("👉", fullUrl)
    const res = await fetch(fullUrl);
    const data = res.json();
    return data;
};