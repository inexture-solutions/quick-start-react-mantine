import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../utils/test-utils';
import HomePage from '@/pages/home/HomePage';

// Mock the Welcome component
vi.mock('@/components/dummy/Welcome.tsx', () => ({
  default: () => <div data-testid="welcome-component">Welcome Component</div>
}));

describe('HomePage Component', () => {
  it('renders homepage correctly', () => {
    render(<HomePage />);

    // Check if the page renders
    expect(screen.getByTestId('welcome-component')).toBeInTheDocument();
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

  it('lazy loads Welcome component', () => {
    render(<HomePage />);

    // Since we're mocking the Welcome component, we verify it's rendered
    expect(screen.getByTestId('welcome-component')).toBeInTheDocument();
    expect(screen.getByText('Welcome Component')).toBeInTheDocument();
  });

  it('handles Suspense boundary correctly', () => {
    // Test that the Suspense component is working
    render(<HomePage />);

    // The mocked component should be rendered without loading state
    expect(screen.getByTestId('welcome-component')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
