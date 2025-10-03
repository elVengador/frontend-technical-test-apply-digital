import { Games } from "@/components/Games";
import { getGames } from "@/repository/games.repository";

export default async function Home() {
  const data = await getGames();

  return (
    <main className="">
      <Games data={data} />
    </main>
  );
}
