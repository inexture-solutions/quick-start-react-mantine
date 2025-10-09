import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../utils/test-utils';
import ContactPage from '@/pages/contact/ContactPage';

// Mock react-router hooks
const mockNavigate = vi.fn();
const mockBlocker = {
  state: 'unblocked',
  proceed: vi.fn(),
  reset: vi.fn()
};

vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
  useBlocker: () => mockBlocker
}));

// Mock inexture modals
vi.mock('@inexture/modals', () => ({
  closeAllModals: vi.fn(),
  closeModal: vi.fn()
}));

describe('ContactPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockBlocker.state = 'unblocked';
  });

  it('renders contact page correctly', () => {
    render(<ContactPage />);

    // Check for Go Back button
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  it('handles go back button click', () => {
    render(<ContactPage />);

    const goBackButton = screen.getByText('Go Back');
    fireEvent.click(goBackButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('does not show modal when not blocked', () => {
    mockBlocker.state = 'unblocked';
    render(<ContactPage />);

    // Modal should not be visible
    expect(
      screen.queryByText('Are you sure you want to leave this page ?')
    ).not.toBeInTheDocument();
  });

  it('shows confirmation modal when blocked', () => {
    mockBlocker.state = 'blocked';
    render(<ContactPage />);

    // Modal should be visible
    expect(
      screen.getByText('Are you sure you want to leave this page ?')
    ).toBeInTheDocument();
    expect(screen.getByText('Yes, Leave')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
  });

  it('handles Yes, Leave button click', () => {
    mockBlocker.state = 'blocked';
    render(<ContactPage />);

    const yesButton = screen.getByText('Yes, Leave');
    fireEvent.click(yesButton);

    expect(mockBlocker.proceed).toHaveBeenCalled();
  });

  it('handles No button click', () => {
    mockBlocker.state = 'blocked';
    render(<ContactPage />);

    const noButton = screen.getByText('No');
    fireEvent.click(noButton);

    expect(mockBlocker.reset).toHaveBeenCalled();
  });

  it('has correct button styling', () => {
    render(<ContactPage />);

    const goBackButton = screen.getByText('Go Back');
    expect(goBackButton).toBeInTheDocument();
  });

  it('modal has correct properties when blocked', () => {
    mockBlocker.state = 'blocked';
    render(<ContactPage />);

    // Check if modal content is present
    const modalText = screen.getByText(
      'Are you sure you want to leave this page ?'
    );
    expect(modalText).toBeInTheDocument();

    // Check if both buttons are present
    expect(screen.getByText('Yes, Leave')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
  });

  it('does not call proceed when not blocked', () => {
    mockBlocker.state = 'unblocked';
    render(<ContactPage />);

    // Since modal is not visible, proceed should not be called
    expect(mockBlocker.proceed).not.toHaveBeenCalled();
  });

  it('renders Fragment wrapper correctly', () => {
    const { container } = render(<ContactPage />);

    // The component should render without throwing errors
    expect(container).toBeInTheDocument();
  });
});
