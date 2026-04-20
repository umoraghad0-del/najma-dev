export function calculateBookingPrice(price:number, seats:number):number{

if(seats <= 0){
throw new Error("Seats must be greater than 0")
}

return price * seats

}