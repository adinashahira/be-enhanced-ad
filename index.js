import express from 'express';

import { BookingBalancing } from './booking-balancing.js';

const booking = new BookingBalancing();
const app = express();
const PORT = 8080;

if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => {
		console.log(`Booking Balancing can be access on port ${PORT}`);
	});
}

app.use(express.json());

app.post('/initialize-budget', booking.initializeBudgetAllocation);
app.post('/consume-budget', booking.consumeBudget);
app.post('/rebalance-budget', booking.rebalanceBudget);

/**
 * TEST BLOCK
 * FOR TESTING LOCALLY WITHOUT USING POSTMAN, USE THESE CODE
 */
// let budget = 1500;
// let action1, action2, action3;

// console.log('budget:', budget);
// console.log('-------------------------INITIAL------------------------------');
// const streams = booking.initializeBudgetAllocation(budget, ['TV', 'Radio', 'Podcast']);

// console.log('--------------------FIRST CALL---------------------');
// action1 = booking.consumeBudget(streams);
// console.log('--------------------SECOND CALL---------------------');
// action2 = booking.consumeBudget(action1);
// console.log('--------------------REBALANCE---------------------');
// action3 = booking.rebalanceBudget(action2);
// console.log('--------------------CALL AFTER REBALANCE---------------------');
// booking.consumeBudget(action3);
