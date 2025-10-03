import { getGames } from "@/repository/games.repository";

export default async function Cart() {
  const data = await getGames();

  return <main className="">Cart</main>;
}
