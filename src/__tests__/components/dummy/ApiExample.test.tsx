import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../../utils/test-utils';
import { mockRepoData } from '../../utils/test-utils';
import ApiExample from '@/components/dummy/ApiExample';

// Mock the service hook
const mockUseGetReposQuery = vi.fn();
vi.mock('@/services/dummy.service.ts', () => ({
  useGetReposQuery: () => mockUseGetReposQuery()
}));

describe('ApiExample Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    mockUseGetReposQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null
    });

    render(<ApiExample />);

    // Check for section title
    expect(screen.getByText('Featured Projects')).toBeInTheDocument();

    // Check for section description
    expect(
      screen.getByText(/Explore our latest open-source contributions/)
    ).toBeInTheDocument();

    // Check for loading skeletons
    const loadingElements = screen.getAllByText('Loading...');
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it('renders projects correctly when data is loaded', async () => {
    mockUseGetReposQuery.mockReturnValue({
      data: mockRepoData,
      isLoading: false,
      error: null
    });

    render(<ApiExample />);

    await waitFor(() => {
      // Check for project titles
      expect(screen.getByText('test repo')).toBeInTheDocument();
      expect(screen.getByText('another repo')).toBeInTheDocument();
    });

    // Check for project descriptions
    expect(screen.getByText('A test repository')).toBeInTheDocument();
    expect(screen.getByText('Another test repository')).toBeInTheDocument();
  });

  it('renders project badges correctly', async () => {
    mockUseGetReposQuery.mockReturnValue({
      data: mockRepoData,
      isLoading: false,
      error: null
    });

    render(<ApiExample />);

    await waitFor(() => {
      // Check for language badges
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('JavaScript')).toBeInTheDocument();

      // Check for private badge
      expect(screen.getByText('Private')).toBeInTheDocument();

      // Check for star count badge
      expect(screen.getByText('⭐ 10')).toBeInTheDocument();
      expect(screen.getByText('⭐ 5')).toBeInTheDocument();
    });
  });

  it('renders project details correctly', async () => {
    mockUseGetReposQuery.mockReturnValue({
      data: mockRepoData,
      isLoading: false,
      error: null
    });

    render(<ApiExample />);

    await waitFor(() => {
      // Check for update dates
      expect(screen.getByText(/Updated: 2023-10-09/)).toBeInTheDocument();

      // Check for license information
      expect(screen.getByText(/License: MIT/)).toBeInTheDocument();
      expect(screen.getByText(/License: Apache-2.0/)).toBeInTheDocument();
    });
  });

  it('renders action buttons correctly', async () => {
    mockUseGetReposQuery.mockReturnValue({
      data: mockRepoData,
      isLoading: false,
      error: null
    });

    render(<ApiExample />);

    await waitFor(() => {
      // Check for Source buttons
      const sourceButtons = screen.getAllByText('Source');
      expect(sourceButtons).toHaveLength(2);

      // Check for Demo button (only one repo has homepage)
      const demoButtons = screen.getAllByText('Demo');
      expect(demoButtons).toHaveLength(1);
    });
  });

  it('renders GitHub icons correctly', async () => {
    mockUseGetReposQuery.mockReturnValue({
      data: mockRepoData,
      isLoading: false,
      error: null
    });

    render(<ApiExample />);

    await waitFor(() => {
      // Check for GitHub icons
      const githubIcons = screen.getAllByText('GitHub Icon');
      expect(githubIcons.length).toBeGreaterThan(0);
    });
  });

  it('handles projects without description', async () => {
    const dataWithoutDesc = [
      {
        ...mockRepoData[0],
        description: null
      }
    ];

    mockUseGetReposQuery.mockReturnValue({
      data: dataWithoutDesc,
      isLoading: false,
      error: null
    });

    render(<ApiExample />);

    await waitFor(() => {
      expect(screen.getByText('No description available')).toBeInTheDocument();
    });
  });

  it('handles projects without language', async () => {
    const dataWithoutLang = [
      {
        ...mockRepoData[0],
        language: null
      }
    ];

    mockUseGetReposQuery.mockReturnValue({
      data: dataWithoutLang,
      isLoading: false,
      error: null
    });

    render(<ApiExample />);

    await waitFor(() => {
      expect(screen.getByText('Code')).toBeInTheDocument();
    });
  });

  it('renders "View All Projects" button when more than 8 projects', async () => {
    const manyProjects = Array.from({ length: 10 }, (_, i) => ({
      ...mockRepoData[0],
      id: i + 1,
      name: `repo-${i + 1}`
    }));

    mockUseGetReposQuery.mockReturnValue({
      data: manyProjects,
      isLoading: false,
      error: null
    });

    render(<ApiExample />);

    await waitFor(() => {
      expect(screen.getByText('View All Projects →')).toBeInTheDocument();
    });
  });

  it('does not render "View All Projects" button when 8 or fewer projects', async () => {
    mockUseGetReposQuery.mockReturnValue({
      data: mockRepoData, // Only 2 projects
      isLoading: false,
      error: null
    });

    render(<ApiExample />);

    await waitFor(() => {
      expect(screen.queryByText('View All Projects →')).not.toBeInTheDocument();
    });
  });

  it('applies correct CSS classes', async () => {
    mockUseGetReposQuery.mockReturnValue({
      data: mockRepoData,
      isLoading: false,
      error: null
    });

    render(<ApiExample />);

    // Check if gradient text class is applied to title
    const title = screen.getByText('Featured Projects');
    expect(title).toHaveClass('gradient-text');
  });

  it('renders proper link attributes', async () => {
    mockUseGetReposQuery.mockReturnValue({
      data: mockRepoData,
      isLoading: false,
      error: null
    });

    render(<ApiExample />);

    await waitFor(() => {
      // Check source button links
      const sourceButtons = screen.getAllByText('Source');
      expect(sourceButtons[0].closest('a')).toHaveAttribute(
        'href',
        'https://github.com/test/test-repo'
      );
      expect(sourceButtons[0].closest('a')).toHaveAttribute('target', '_blank');

      // Check demo button link
      const demoButton = screen.getByText('Demo');
      expect(demoButton.closest('a')).toHaveAttribute(
        'href',
        'https://test-repo.com'
      );
      expect(demoButton.closest('a')).toHaveAttribute('target', '_blank');
    });
  });
});
