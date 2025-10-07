import { expect, test } from "vitest"
import { getTotalPrice } from "./cart.utils"
import { Game } from "./endpoint"

test("test products total price", () => {
    const products: Game[] = [
        { id: "01", genre: "action", description: "lorem b", image: "", name: "game1", price: 22.3444, isNew: false },
        { id: "02", genre: "sport", description: "lorem a", image: "", name: "game2", price: 12, isNew: false },
        { id: "03", genre: "action", description: "lorem c", image: "", name: "game3", price: 104.12, isNew: false },
    ]
    expect(getTotalPrice(products)).toBe("138.46")
})