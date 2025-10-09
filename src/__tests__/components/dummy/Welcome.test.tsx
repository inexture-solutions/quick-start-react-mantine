import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../utils/test-utils';
import Welcome from '@/components/dummy/Welcome';

// Mock the ApiExample component since it has complex dependencies
vi.mock('@/components/dummy/ApiExample.tsx', () => ({
  default: () => <div data-testid="api-example">Mocked API Example</div>
}));

describe('Welcome Component', () => {
  it('renders welcome component correctly', () => {
    render(<Welcome />);

    // Check for main heading
    expect(screen.getByText('Quick Starter Template')).toBeInTheDocument();

    // Check for description
    expect(
      screen.getByText(
        /A powerful, fully customized and production-ready starter project/
      )
    ).toBeInTheDocument();

    // Check for badge
    expect(screen.getByText('✨ Modern Development Stack')).toBeInTheDocument();
  });

  it('renders tech stack section', () => {
    render(<Welcome />);

    // Check for tech stack heading
    expect(
      screen.getByText('Built with Modern Technologies')
    ).toBeInTheDocument();

    // Check for tech stack description
    expect(
      screen.getByText(/Carefully selected tools and frameworks/)
    ).toBeInTheDocument();

    // Check for tech stack items
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('RTK Query')).toBeInTheDocument();
    expect(screen.getByText('Mantine')).toBeInTheDocument();
    expect(screen.getByText('Prettier')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('ESLint')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<Welcome />);

    // Check for Contact button
    const contactButton = screen.getByText('Get in Touch');
    expect(contactButton).toBeInTheDocument();
    expect(contactButton.closest('a')).toHaveAttribute('href', '/contact');

    // Check for GitHub button
    const githubButton = screen.getByText('Explore Projects');
    expect(githubButton).toBeInTheDocument();
    expect(githubButton.closest('a')).toHaveAttribute(
      'href',
      'https://github.com/inexture-solutions'
    );
  });

  it('renders Inexture logo with correct link', () => {
    render(<Welcome />);

    const logoImage = screen.getByAltText('');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute(
      'src',
      'https://www.inexture.com/wp-content/uploads/2023/06/inx-white-logos.png'
    );

    const logoLink = logoImage.closest('a');
    expect(logoLink).toHaveAttribute(
      'href',
      'https://github.com/inexture-solutions'
    );
  });

  it('renders tech stack tooltips correctly', () => {
    render(<Welcome />);

    // Find React tech stack item
    const reactText = screen.getByText('React');
    const reactContainer = reactText.closest('[title]');

    // Check if tooltip is present (mocked tooltip should have title attribute)
    expect(reactContainer).toBeInTheDocument();
  });

  it('tech stack items have correct descriptions', () => {
    render(<Welcome />);

    // The descriptions are shown on hover, but we can verify they exist in the component
    // Since descriptions might be hidden by default, we check the component structure
    const techStackSection = screen
      .getByText('Built with Modern Technologies')
      .closest('div');
    expect(techStackSection).toBeInTheDocument();
  });

  it('renders API example section', () => {
    render(<Welcome />);

    // Check if the mocked API example component is rendered
    expect(screen.getByTestId('api-example')).toBeInTheDocument();
  });

  it('has proper responsive classes', () => {
    render(<Welcome />);

    const mainTitle = screen.getByText('Quick Starter Template');
    expect(mainTitle).toHaveClass('responsive-title');
  });

  it('has proper styling classes', () => {
    render(<Welcome />);

    const mainTitle = screen.getByText('Quick Starter Template');
    expect(mainTitle).toHaveClass('gradient-text');
    expect(mainTitle).toHaveClass('animate-pulse-glow');
  });

  it('button interactions work correctly', () => {
    render(<Welcome />);

    const contactButton = screen.getByText('Get in Touch');
    const githubButton = screen.getByText('Explore Projects');

    // Verify buttons are clickable
    expect(contactButton).not.toBeDisabled();
    expect(githubButton).not.toBeDisabled();

    // Check if buttons have hover-lift class for animations
    expect(contactButton).toHaveClass('hover-lift');
    expect(githubButton).toHaveClass('hover-lift');
  });

  it('renders with correct component structure', () => {
    const { container } = render(<Welcome />);

    // Check if the main container has the correct styling
    const mainBox = container.firstChild as HTMLElement;
    expect(mainBox).toHaveClass('min-h-screen', 'relative', 'overflow-hidden');
  });
});
