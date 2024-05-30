export class BookingBalancing {
	constructor() {
		this.streamsAllocation = [];
	}

	// Initialize equal budgets for all streams
	initializeBudgetAllocation = (req, res) => {
		let budget = req.body.budget;
		let streams = req.body.streams;
		console.log('stream:', streams);

		try {
			this.streamsAllocation = [];
			let numOfStreams = streams.length;
			let initialBudgetPerStream = budget / numOfStreams;

			streams.forEach((stream) => {
				this.streamsAllocation.push({
					streamName: stream,
					previousStreamBudget: initialBudgetPerStream,
					streamConsumption: 0,
					currentStreamBudget: initialBudgetPerStream,
					streamUsageBalance: '100%',
				});
			});

			console.log('Initial budget per stream:', this.streamsAllocation);

			res.status(200).send({
				message: 'Budget Allocated',
				budget: this.streamsAllocation,
			});

			return this.streamsAllocation;
		} catch (err) {
			console.error(err);
			res.status(400).send('Request Invalid. Processing Failure');
		}
	};

	// Randomize consumption of budget for each streams
	consumeBudget = (req, res) => {
		try {
			let streams = req.body;

			streams.forEach((stream) => {
				let budget = stream.currentStreamBudget;
				// console.log(`budget in randomize for ${stream.streamName}:`, budget);

				let consumption = Math.floor(Math.random() * (budget + 1));
				// console.log(`consumption for ${stream.streamName}: ${consumption}`);

				let newBalance = budget - consumption;
				// console.log(`newBalance for ${stream.streamName}:`, newBalance);

				stream.previousStreamBudget = budget;
				stream.streamConsumption = consumption;
				stream.currentStreamBudget = newBalance;
				stream.streamUsageBalance = `${((stream.currentStreamBudget / budget) * 100).toFixed(2)}%`;
			});

			console.log('Budget per streams after consumption:', streams);

			res.status(200).send({
				message: 'Budgets consumed',
				budget: streams,
			});
			return streams;
		} catch (err) {
			console.error(err);
			res.status(400).send('Request Invalid. Processing Failure');
		}
	};

	// Rebalance budget for all streams
	rebalanceBudget = (req, res) => {
		try {
			let streams = req.body;

			console.log('Streams budget before rebalancing:', streams);
			let totalRemainingBudget = 0;

			streams.forEach((stream) => {
				totalRemainingBudget += stream.currentStreamBudget;
			});

			let rebalancedBudgetPerStream = totalRemainingBudget / streams.length;
			console.log('Total Remaining Budget:', totalRemainingBudget);

			// Case 1: Each Stream Usage Balance (%) is 0% or less
			if (streams.every((stream) => parseFloat(stream.streamUsageBalance) <= 0)) {
				console.log('Budget has been fully utilised for all ad streams');
				res.status(200).send({
					message: 'Budget has been fully utilised for all ad streams',
					budget: streams,
				});
				return streams;
			}

			// Case 2: Each Stream Usage Balance (%) is less than or more than 5%
			if (streams.every((stream) => parseFloat(stream.streamUsageBalance) < 5) || streams.every((stream) => parseFloat(stream.streamUsageBalance) >= 5)) {
				console.log('Budget is still being utilised on all ad streams');
				res.status(200).send({
					message: 'Budget is still utilised for all ad streams',
					budget: streams,
				});
				return streams;
			}

			// Case 3: Any one or more but not all Usage Balance (%) is/are less than 5%
			const streamsBelow5Pct = streams.filter((stream) => parseFloat(stream.streamUsageBalance) < 5);
			console.log("An ad stream's budget has gone below 5%, rebalancing will commence");
			console.log('New Balanced Budget Amount:', rebalancedBudgetPerStream);

			if (streamsBelow5Pct.length > 0) {
				streamsBelow5Pct.forEach((stream) => {
					console.log(`${stream.streamName}'s Stream Balance Is ${stream.currentStreamBudget}`);
				});

				// Rebalancing process
				streams.forEach((stream) => {
					stream.previousStreamBudget = rebalancedBudgetPerStream;
					stream.currentStreamBudget = rebalancedBudgetPerStream;
					stream.isAdjusted = 'true';
				});
				res.status(200).send({
					message: "An ad stream's budget has gone below 5%, streams budget is rebalanced.",
					budget: streams,
				});
				return streams;
			}

			console.log('New streams balance:', streams);

			// res.status(200).send(streams);
			return streams;
		} catch (err) {
			console.error(err);
			res.status(400).send('Request Invalid. Processing Failure');
		}
	};
}
