import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@solidjs/testing-library';
import HelloCard from '../../../src/components/cards/HelloCard';

describe('HelloCard', () => {
  beforeEach(() => {
    render(() => <HelloCard />);
  });

  it('displays the title', async () => {
    expect(
      await screen.getByRole('heading', { name: 'Hello' })
    ).toBeInTheDocument();
  });
});
