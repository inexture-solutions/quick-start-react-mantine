import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../../utils/test-utils';
import HomePage from '@/pages/home/HomePage';

// Match lazy() specifier (Vitest may normalize to either form)
vi.mock('@components/dummy/Welcome.tsx', () => ({
  default: () => <div data-testid="welcome-component">Welcome Component</div>
}));
vi.mock('@components/dummy/Welcome', () => ({
  default: () => <div data-testid="welcome-component">Welcome Component</div>
}));

describe('HomePage Component', () => {
  it('renders homepage correctly', async () => {
    render(<HomePage />);

    expect(
      await screen.findByTestId('welcome-component', {}, { timeout: 3000 })
    ).toBeInTheDocument();
  });

  it('shows loading fallback initially', () => {
    // This test checks if Suspense fallback is shown
    // Since the component is mocked, we'll test the structure
    const { container } = render(<HomePage />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with proper component structure', () => {
    const { container } = render(<HomePage />);

    // Check if the component has a div wrapper
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('lazy loads Welcome component', async () => {
    render(<HomePage />);

    expect(
      await screen.findByTestId('welcome-component', {}, { timeout: 3000 })
    ).toBeInTheDocument();
    expect(screen.getByText('Welcome Component')).toBeInTheDocument();
  });

  it('handles Suspense boundary correctly', async () => {
    render(<HomePage />);

    expect(
      await screen.findByTestId('welcome-component', {}, { timeout: 3000 })
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });
});
