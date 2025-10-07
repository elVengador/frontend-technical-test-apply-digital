import { Games } from "@/components/Games";
import { getGames } from "@/services/games.services";

type HomeProps = { searchParams: { genre?: string } };

export default async function Home({ searchParams }: HomeProps) {
  const genre = searchParams.genre || "";
  const data = await getGames(genre);

  return (
    <main className="">
      <Games data={data} genre={genre} />
    </main>
  );
}
