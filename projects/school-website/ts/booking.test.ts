import { calculateBookingPrice } from "./booking"

test("calculate booking price", () => {

const result = calculateBookingPrice(5000,2)

expect(result).toBe(10000)

})