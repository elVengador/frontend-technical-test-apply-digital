import { Game } from "@/utils/endpoint";

export type GetGamesOutput = { games: Game[], availableFilters: string[], totalPages: number, currentPage: number }