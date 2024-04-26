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
		// console.log('streams:', streams);

		streams.forEach((stream) => {
			let budget = stream.streamBudgetBalance;
			let consumption = Math.floor(Math.random() * (budget + 1));

			// console.log(`consumption for ${stream.streamName}: ${consumption}`);

			let newBalance = budget - consumption;

			stream.streamBudget = budget;
			stream.streamConsumption = consumption;
			stream.streamBudgetBalance = newBalance;
			stream.streamUsageBalance = `${((stream.streamBudgetBalance / budget) * 100).toFixed(2)}%`;
		});

		console.log('current budget per streams:', streams);
	};
}
