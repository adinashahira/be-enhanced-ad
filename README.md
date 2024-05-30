# Enhanced Ad Booking Experience

The logic for ad stream budget rebalancing is written in `booking-balancing.js`

To test the logic without running it as an API, uncomment the code under **TEST BLOCK**

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

The logic can also be tested as APIs using postman, refer below for sample requests

API 1: Initialize Budget

> POST http://localhost:8080/initialize-budget

Sample Body

```
{
    "budget": 1500,
    "streams": ["TV", "Radio", "Podcast"]
}
```

API 2: Consume Budget

> POST http://localhost:8080/consume-budget

Sample Body

```
[
  {
    "streamName":  "TV",
    "previousStreamBudget": 500,
    "streamConsumption": 0,
    "currentStreamBudget": 500,
    "streamUsageBalance": "100%"
  },
   {
    "streamName":  "TV",
    "previousStreamBudget": 500,
    "streamConsumption": 0,
    "currentStreamBudget": 500,
    "streamUsageBalance": "100%"
  },
    {
    "streamName":  "TV",
    "previousStreamBudget": 500,
    "streamConsumption": 0,
    "currentStreamBudget": 500,
    "streamUsageBalance": "100%"
  }
]
```

API 3: Rebalance Budget

> POST http://localhost:8080/consume-budget

Sample Body

```
[
    {
        "streamName": "TV",
        "previousStreamBudget": 500,
        "streamConsumption": 25,
        "currentStreamBudget": 475,
        "streamUsageBalance": "95.00%"
    },
    {
        "streamName": "TV",
        "previousStreamBudget": 500,
        "streamConsumption": 491,
        "currentStreamBudget": 9,
        "streamUsageBalance": "1.80%"
    },
    {
        "streamName": "TV",
        "previousStreamBudget": 500,
        "streamConsumption": 6,
        "currentStreamBudget": 494,
        "streamUsageBalance": "98.80%"
    }
]
```

To run unit test for this project, use `npm test`
