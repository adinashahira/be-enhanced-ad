export class BookingBalancing {
	constructor() {
		this.streamsAllocation = [];
	}

	// Initialize equal budgets for all streams
	initializeBudgetAllocation = (budget, streams) => {
		let numOfStreams = streams.length;
		let initialBudgetPerStream = budget / numOfStreams;

		streams.forEach((stream) => {
			this.streamsAllocation.push({
				streamName: stream,
				streamBudget: initialBudgetPerStream,
				streamConsumption: 0,
				streamBudgetBalance: initialBudgetPerStream,
				streamUsageBalance: '100%',
			});
		});

		console.log('initial budget per stream:', this.streamsAllocation);
		return this.streamsAllocation;
	};

	// Randomize consumption of budget for each streams
	randomizeConsumption = (streams) => {
		streams.forEach((stream) => {
			let budget = stream.streamBudgetBalance;
			let consumption = Math.floor(Math.random() * (budget + 1));
			console.log(`consumption for ${stream.streamName}: ${consumption}`);

			let newBalance = budget - consumption;

			stream.streamBudget = budget;
			stream.streamConsumption = consumption;
			stream.streamBudgetBalance = newBalance;
			stream.streamUsageBalance = `${((stream.streamBudgetBalance / budget) * 100).toFixed(2)}%`;
		});

		console.log('current budget per streams:', streams);

		return streams;
	};

	// Rebalance budget for all streams
	rebalanceBudget = (streams) => {
		let totalRemainingBudget = 0;

		streams.forEach((stream) => {
			totalRemainingBudget += stream.streamBudgetBalance;
		});

		let rebalancedBudgetPerStream = totalRemainingBudget / streams.length;
		console.log('Total Remaining Budget:', totalRemainingBudget);

		// Case 1: Each Stream Usage Balance (%) is 0% or less
		if (streams.every((stream) => parseFloat(stream.streamUsageBalance) <= 0)) {
			console.log('Budget has been fully utilised for all ad streams');
			return streams;
		}

		// Case 2: Each Stream Usage Balance (%) is less than or more than 5%
		if (streams.every((stream) => parseFloat(stream.streamUsageBalance) < 5) || streams.every((stream) => parseFloat(stream.streamUsageBalance) >= 5)) {
			console.log('Budget is still being utilised on all ad streams');
			return streams;
		}

		// Case 3: Any one or more but not all Usage Balance (%) is/are less than 5%
		const streamsBelow5Pct = streams.filter((stream) => parseFloat(stream.streamUsageBalance) < 5);
		console.log("An ad stream's budget has gone below 5%, rebalancing will commence");
		console.log('Rebalanced Amount:', rebalancedBudgetPerStream);

		if (streamsBelow5Pct.length > 0) {
			streamsBelow5Pct.forEach((stream) => {
				console.log(`stream ${stream.streamName}'s balance is ${stream.streamUsageBalance}`);
			});

			// Rebalancing process
			streams.forEach((stream) => {
				stream.streamBudget = rebalancedBudgetPerStream;
				stream.isAdjusted = 'true';
			});

			return streams;
		}

		console.log('New streams balance:', streams);
		return streams;
	};
}
