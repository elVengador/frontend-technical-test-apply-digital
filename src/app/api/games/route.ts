import { GetGamesOutput } from "@/types";
import { allGames, availableFilters, delay } from "@/utils/endpoint";
import { getGamesByPage } from "@/utils/games.utils";

const ITEMS_PER_PAGE = 12;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre");
  const page = parseInt(searchParams.get("page") ?? "1");

  let filteredGames = allGames
  if (genre) {
    filteredGames = allGames.filter(
      (game) => game.genre.toLowerCase() === genre.toLowerCase()
    );
  }


  // Mock a delay to simulate a real API
  await delay(2000);

  const dataPerPage = getGamesByPage(filteredGames, page, ITEMS_PER_PAGE)
  const response: GetGamesOutput = { availableFilters, ...dataPerPage }
  return Response.json(response);
}
