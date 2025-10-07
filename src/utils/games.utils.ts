import { Game } from "./endpoint";

export type GetGamesByPage = { games: Game[], totalPages: number, currentPage: number }
export const getGamesByPage = (games: Game[], page: number, itemsPerPage: number): GetGamesByPage => {
    const currentPage = (page < 1 || isNaN(page)) ? 1 : page
    const fromIndex = (currentPage - 1) * itemsPerPage;
    const toIndex = currentPage * itemsPerPage;
    const gamesPerPage = games.slice(fromIndex, toIndex);
    const totalPages = Math.ceil(games.length / itemsPerPage);
    return { currentPage, games: gamesPerPage, totalPages }
}