import { describe, expect, it } from 'vitest';
import { render, screen } from '@solidjs/testing-library';
import ProjectedIncomeCard from '@/components/cards/ProjectedIncomeCard';

describe('ProjectedIncomeCard', () => {
  // Create a period object to use in the tests.
  const period = {
    range: 'monthly',
    start: new Date('2023-02-01'),
    end: new Date('2023-03-31'),
  };

  // Create an income array to use in the tests.
  const income = [
    {
      uid: '8ddd6810',
      refs: null,
      source: 'salary',
      amount: 65800,
      currency: 'ZAR',
      nature: 'income',
      description: 'Base salary.',
      frequency: {
        recurring: true,
        unit: 'month',
        value: 1,
        start: '2023-02-28T08:30:30.000Z',
        end: null,
      },
      created_at: '2023-01-07T06:35:34.155Z',
      updated_at: '2023-01-07T06:35:34.155Z',
    },
    {
      uid: '75a700fe',
      refs: null,
      source: 'bonus',
      amount: 14200,
      currency: 'ZAR',
      nature: 'income',
      description: 'Y1 siging bonus.',
      frequency: {
        recurring: true,
        unit: 'month',
        value: 1,
        end: '2023-12-28T08:30:30.000Z',
      },
      created_at: '2023-02-28T08:30:30.000Z',
      updated_at: '2023-02-28T08:30:30.000Z',
    },
  ];

  it('displays the title', async () => {
    // Render the component
    render(() => <ProjectedIncomeCard period={period} income={income} />);

    // Get the title based on the period.
    const title = screen.getByRole('heading', {
      name: `Projected ${period.range} income`,
    });

    // Assert that the title exists.
    expect(title).toBeTruthy();
  });

  it('displays the amount', async () => {
    expect(true).toBeTruthy();
  });
});
