import { GetGamesOutput } from "@/types";
import { API_URI } from "./services.config";

export const getGames = async (genre: string = '', page: number = 1): Promise<GetGamesOutput> => {
    const fullUrl = `${API_URI}/games?genre=${genre}&page=${page}`
    const res = await fetch(fullUrl);
    if (!res.ok) {
        const errorBody = await res.text();
        console.error(" Status:", res.status, "body:", errorBody);
        throw new Error(`fail fetch status ${res.status}`);
    }
    const data = res.json();
    return data;
};