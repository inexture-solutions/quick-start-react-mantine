import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock the @inexture/core modules
vi.mock('@inexture/core', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  Text: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  Box: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Stack: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Group: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Container: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Paper: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Image: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
  Badge: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  Tooltip: ({ children, label, ...props }: any) => (
    <div {...props} title={label}>
      {children}
    </div>
  ),
  ActionIcon: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  List: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
  ListItem: ({ children, ...props }: any) => <li {...props}>{children}</li>,
  Skeleton: (props: any) => <div {...props}>Loading...</div>,
  createTheme: vi.fn(),
  mergeMantineTheme: vi.fn()
}));

// Mock @inexture/core/icons/ai
vi.mock('@inexture/core/icons/ai', () => ({
  AiFillGithub: () => <span>GitHub Icon</span>,
  AiFillEye: () => <span>Eye Icon</span>
}));

// Mock react-router
vi.mock('react-router', () => ({
  Link: ({ children, to, ...props }: any) => <a href={to} {...props}>{children}</a>
}));

// Mock dayjs
vi.mock('dayjs', () => {
  const mockDayjs = (date?: any) => ({
    format: (format: string) => '2023-10-09'
  });
  return { default: mockDayjs };
});

// Global test utilities
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});