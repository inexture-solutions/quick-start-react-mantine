import { describe, it, expect } from 'vitest';
import { render, screen } from '../../utils/test-utils';
import ErrorPage from '@/pages/error/ErrorPage';

describe('ErrorPage Component', () => {
  it('renders error page correctly', () => {
    render(<ErrorPage />);

    // Check for main heading
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Check for error description
    expect(
      screen.getByText(
        /The page or resource you're trying to access has been removed/
      )
    ).toBeInTheDocument();
  });

  it('has correct heading structure', () => {
    render(<ErrorPage />);

    const heading = screen.getByText('Something went wrong');
    expect(heading).toBeInTheDocument();
  });

  it('displays complete error message', () => {
    render(<ErrorPage />);

    const errorMessage = screen.getByText(
      /The page or resource you're trying to access has been removed or you don't have sufficient permission to access\./
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('has proper layout classes', () => {
    const { container } = render(<ErrorPage />);

    // Check if the section has the correct CSS classes
    const section = container.querySelector('section');
    expect(section).toHaveClass(
      'min-h-screen',
      'flex',
      'items-center',
      'justify-center'
    );
  });

  it('has proper grid layout', () => {
    const { container } = render(<ErrorPage />);

    // Check for container and grid classes
    const containerDiv = container.querySelector('.container');
    expect(containerDiv).toBeInTheDocument();

    const gridDiv = container.querySelector('.grid');
    expect(gridDiv).toHaveClass('grid-cols-1');
  });

  it('has centered text content', () => {
    const { container } = render(<ErrorPage />);

    // Check for text-center class
    const textCenterDiv = container.querySelector('.text-center');
    expect(textCenterDiv).toBeInTheDocument();
  });

  it('renders as a section element', () => {
    const { container } = render(<ErrorPage />);

    // Check if the root element is a section
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });

  it('has proper semantic structure', () => {
    const { container } = render(<ErrorPage />);

    // Check the overall structure
    const section = container.querySelector('section');
    const containerDiv = section?.querySelector('.container');
    const gridDiv = containerDiv?.querySelector('.grid');
    const textCenterDiv = gridDiv?.querySelector('.text-center');

    expect(section).toBeInTheDocument();
    expect(containerDiv).toBeInTheDocument();
    expect(gridDiv).toBeInTheDocument();
    expect(textCenterDiv).toBeInTheDocument();
  });

  it('heading and description are properly structured', () => {
    render(<ErrorPage />);

    // Both heading and description should be present
    const heading = screen.getByText('Something went wrong');
    const description = screen.getByText(
      /The page or resource you're trying to access/
    );

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
