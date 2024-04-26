import { BookingBalancing } from './booking-balancing.js';

const booking = new BookingBalancing();

// hardcoded values
let budget = 15000;

console.log('budget:', budget);
console.log('-------------------------INITIAL------------------------------');
const streams = booking.initializeBudgetAllocation(budget, ['TV', 'Radio', 'Podcast']);
console.log('--------------------FIRST CALL---------------------');
booking.randomizeConsumption(streams);
console.log('--------------------SECOND CALL---------------------');
booking.randomizeConsumption(streams);
