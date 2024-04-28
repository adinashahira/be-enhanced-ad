// booking-balancing.test.js
import { BookingBalancing } from '../booking-balancing.js';

describe('BookingBalancing', () => {
	let booking;

	beforeEach(() => {
		booking = new BookingBalancing();
	});

	describe('initializeBudgetAllocation', () => {
		test('should initialize budgets for all streams', () => {
			const budget = 15000;
			const streams = ['TV', 'Radio', 'Podcast'];

			const result = booking.initializeBudgetAllocation(budget, streams);

			expect(result).toHaveLength(3);
			expect(result[0].streamName).toBe('TV');
			expect(result[0].streamBudget).toBeCloseTo(5000);
			expect(result[1].streamName).toBe('Radio');
			expect(result[1].streamBudget).toBeCloseTo(5000);
			expect(result[2].streamName).toBe('Podcast');
			expect(result[2].streamBudget).toBeCloseTo(5000);
		});
	});

	describe('randomizeConsumption', () => {
		test('should update stream budgets after random consumption', () => {
			const streams = [
				{ streamName: 'TV', streamBudgetBalance: 5000 },
				{ streamName: 'Radio', streamBudgetBalance: 4000 },
			];

			const result = booking.randomizeConsumption(streams);

			expect(result[0].streamBudgetBalance).toBeLessThan(5000);
			expect(result[1].streamBudgetBalance).toBeLessThan(4000);
		});
	});

	describe('rebalanceBudget', () => {
		test('should return streams without rebalancing for case each Stream Usage Balance (%) is 0% or less', () => {
			const streams = [
				{ streamName: 'TV', streamBudgetBalance: 0, streamUsageBalance: '0%' },
				{ streamName: 'Radio', streamBudgetBalance: 0, streamUsageBalance: '0%' },
			];

			const result = booking.rebalanceBudget(streams);

			expect(result).toBe(streams);
			expect(result[0].streamBudgetBalance).toBe(0);
			expect(result[1].streamBudgetBalance).toBe(0);
		});

		test('should not rebalance budgets when each Stream Usage Balance (%) is less than or more than 5%', () => {
			const streams = [
				{ streamName: 'TV', streamBudgetBalance: 2500, streamUsageBalance: '5%' },
				{ streamName: 'Radio', streamBudgetBalance: 7000, streamUsageBalance: '90%' },
			];

			const result = booking.rebalanceBudget(streams);

			expect(result[0].streamBudgetBalance).toBe(2500);
			expect(result[1].streamBudgetBalance).toBe(7000);
		});

		test('should not rebalance budgets when some streams have balance close to 5% due to precision in comparison', () => {
			const streams = [
				{ streamName: 'TV', streamBudgetBalance: 249, streamUsageBalance: '4.99%' },
				{ streamName: 'Radio', streamBudgetBalance: 5501 },
			];

			const result = booking.rebalanceBudget(streams);

			expect(result[0].streamBudgetBalance).toBe(249);
			expect(result[1].streamBudgetBalance).toBe(5501);
		});

		test('should not rebalance budgets when some streams have balance close to above 5% due to precision in comparison', () => {
			const streams = [
				{ streamName: 'TV', streamBudgetBalance: 251, streamUsageBalance: '5.01%' },
				{ streamName: 'Radio', streamBudgetBalance: 499 },
			];

			const result = booking.rebalanceBudget(streams);

			expect(result[0].streamBudgetBalance).toBe(251);
			expect(result[1].streamBudgetBalance).toBe(499);
		});

		test('should not rebalance budgets when no streams have balance below 5%', () => {
			const streams = [
				{ streamName: 'TV', streamBudgetBalance: 2500, streamUsageBalance: '5.1%' },
				{ streamName: 'Radio', streamBudgetBalance: 7000, streamUsageBalance: '5.2%' },
			];

			const result = booking.rebalanceBudget(streams);

			expect(result[0].streamBudgetBalance).toBe(2500);
			expect(result[1].streamBudgetBalance).toBe(7000);
		});
	});
});
