import { BookingBalancing } from './booking-balancing.js';

const booking = new BookingBalancing();

// hardcoded values
let budget = 1500;
let action1, action2, action3;

console.log('budget:', budget);
console.log('-------------------------INITIAL------------------------------');
const streams = booking.initializeBudgetAllocation(budget, ['TV', 'Radio', 'Podcast']);
console.log('--------------------FIRST CALL---------------------');
action1 = booking.randomizeConsumption(streams);
// console.log(action1);
console.log('--------------------SECOND CALL---------------------');
action2 = booking.randomizeConsumption(streams);
// console.log(action2);
console.log('--------------------REBALANCE---------------------');
action3 = booking.rebalanceBudget(action2);
console.log('--------------------CALL AFTER REBALANCE---------------------');
console.log('after rebalancing:', action3);
booking.randomizeConsumption(action3);
