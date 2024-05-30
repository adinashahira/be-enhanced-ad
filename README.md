# Enhanced Ad Booking Experience

The logic for ad stream budget rebalancing is written in `booking-balancing.js`
To test the logic, invoke the function from index file

**Example**
```
let budget = 1500;
let action1, action2, action3;

console.log('budget:', budget);
console.log('-------------------------INITIAL------------------------------');
const streams = booking.initializeBudgetAllocation(budget, ['TV', 'Radio', 'Podcast']);
console.log('--------------------FIRST CALL---------------------');
action1 = booking.randomizeConsumption(streams);
console.log('--------------------SECOND CALL---------------------');
action2 = booking.randomizeConsumption(streams);
console.log('--------------------REBALANCE---------------------');
action3 = booking.rebalanceBudget(action2);
console.log('--------------------CALL AFTER REBALANCE---------------------');
booking.randomizeConsumption(action3);
```

You can change the budget or the ad streams array.

To run unit test for this project, use `npm test`
