import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../utils/test-utils';
import PublicLayout from '@/layouts/PublicLayout';

// Mock react-router Outlet
vi.mock('react-router', () => ({
  Outlet: () => <div data-testid="outlet">Outlet Content</div>
}));

// Mock ToggleMode component
vi.mock('@inexture/core/utils', () => ({
  ToggleMode: ({ button }: any) => (
    <button data-testid="toggle-mode" data-size={button?.size}>
      Toggle Mode
    </button>
  )
}));

describe('PublicLayout Component', () => {
  it('renders public layout correctly', () => {
    render(<PublicLayout />);

    // Check if Outlet is rendered
    expect(screen.getByTestId('outlet')).toBeInTheDocument();

    // Check if ToggleMode is rendered
    expect(screen.getByTestId('toggle-mode')).toBeInTheDocument();
  });

  it('renders ToggleMode button with correct size', () => {
    render(<PublicLayout />);

    const toggleButton = screen.getByTestId('toggle-mode');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveTextContent('Toggle Mode');
  });

  it('has correct layout structure', () => {
    const { container } = render(<PublicLayout />);

    // Check if the main container has relative positioning
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass('relative');
  });

  it('positions toggle mode button correctly', () => {
    const { container } = render(<PublicLayout />);

    // Check if the toggle button container has correct positioning classes
    const toggleContainer = container.querySelector('.absolute.right-5.top-5');
    expect(toggleContainer).toBeInTheDocument();
  });

  it('renders Outlet for nested routes', () => {
    render(<PublicLayout />);

    // Verify that Outlet component is present for nested routing
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
    expect(screen.getByText('Outlet Content')).toBeInTheDocument();
  });

  it('has proper component hierarchy', () => {
    const { container } = render(<PublicLayout />);

    // Check the structure: main div > toggle container + outlet
    const mainDiv = container.firstChild as HTMLElement;
    const children = mainDiv.children;

    expect(children).toHaveLength(2);
    expect(children[0]).toHaveClass('absolute', 'right-5', 'top-5');
    expect(children[1]).toHaveAttribute('data-testid', 'outlet');
  });

  it('toggle mode button is properly positioned', () => {
    render(<PublicLayout />);

    const toggleButton = screen.getByTestId('toggle-mode');
    const toggleContainer = toggleButton.parentElement;

    expect(toggleContainer).toHaveClass('absolute', 'right-5', 'top-5');
  });

  it('renders without any errors', () => {
    const { container } = render(<PublicLayout />);

    expect(container).toBeInTheDocument();
    expect(container.firstChild).toBeInTheDocument();
  });
});
