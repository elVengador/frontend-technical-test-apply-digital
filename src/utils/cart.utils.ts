import { Game } from "./endpoint";

export const getTotalPrice = (products: Game[]): string => {
    return products
        .map((c) => c.price)
        .reduce((a, c): number => a + c, 0)
        .toFixed(2)
}