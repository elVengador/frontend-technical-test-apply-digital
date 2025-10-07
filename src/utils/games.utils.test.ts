import { expect, test } from "vitest";
import { Game } from "./endpoint";
import { getGamesByPage, GetGamesByPage } from "./games.utils";


test("calculate games per page", () => {
    const gamesOfPage1 = [
        { id: "01", genre: "action", description: "lorem 1", image: "", name: "game1", price: 22.3444, isNew: false },
        { id: "02", genre: "sport", description: "lorem 2", image: "", name: "game2", price: 12, isNew: false }
    ]
    const gamesOfPage2 = [
        { id: "03", genre: "action", description: "lorem 3", image: "", name: "game3", price: 104.12, isNew: false },
        { id: "04", genre: "sport", description: "lorem 4", image: "", name: "game4", price: 44, isNew: false },
    ]
    const gamesOfPage3 = [
        { id: "05", genre: "fantasy", description: "lorem 5", image: "", name: "game5", price: 55, isNew: false },
        { id: "06", genre: "sport", description: "lorem 6", image: "", name: "game6", price: 22, isNew: false },
    ]
    const gamesOfPage4 = [
        { id: "07", genre: "fantasy", description: "lorem 7", image: "", name: "game7", price: 100, isNew: false },
    ]
    const games: Game[] = [...gamesOfPage1, ...gamesOfPage2, ...gamesOfPage3, ...gamesOfPage4]

    const dataOfPage2: GetGamesByPage = { currentPage: 2, games: gamesOfPage2, totalPages: 4 }
    expect(getGamesByPage(games, 2, 2)).toEqual(dataOfPage2)

    const dataOfPage4: GetGamesByPage = { currentPage: 4, games: gamesOfPage4, totalPages: 4 }
    expect(getGamesByPage(games, 4, 2)).toEqual(dataOfPage4)

    const dataOfPage1000: GetGamesByPage = { currentPage: 1000, games: [], totalPages: 4 }
    expect(getGamesByPage(games, 1000, 2)).toEqual(dataOfPage1000)

    const dataOfPageNegative4: GetGamesByPage = { currentPage: 1, games: gamesOfPage1, totalPages: 4 }
    expect(getGamesByPage(games, -4, 2)).toEqual(dataOfPageNegative4)
})