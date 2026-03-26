import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock the @inexture/core modules
vi.mock('@inexture/core', () => ({
  Button: ({
    children,
    component,
    href,
    to,
    gradient: _g,
    leftSection: _ls,
    leftsection: _ls2,
    variant: _v,
    color: _c,
    radius: _r,
    size: _s,
    loading: _l,
    fullWidth: _fw,
    className,
    style,
    onClick,
    target,
    rel,
    type = 'button',
    ..._rest
  }: any) => {
    const common = { className, style, onClick, target, rel };
    if (component === 'a') {
      return (
        <a href={href} {...common}>
          {children}
        </a>
      );
    }
    if (component) {
      const Comp = component;
      return (
        <Comp to={to} href={href} {...common}>
          {children}
        </Comp>
      );
    }
    if (href) {
      return (
        <a href={href} {...common}>
          {children}
        </a>
      );
    }
    if (to) {
      return (
        <a href={to} {...common}>
          {children}
        </a>
      );
    }
    return (
      <button type={type} {...common}>
        {children}
      </button>
    );
  },
  Text: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  Box: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Stack: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Group: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Flex: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Container: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Paper: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Image: ({ alt, ...props }: any) => (
    <img alt={alt ?? ''} {...props} />
  ),
  Badge: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  Tooltip: ({ children, label, ...props }: any) => (
    <div {...props} title={label}>
      {children}
    </div>
  ),
  ActionIcon: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
  List: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
  ListItem: ({ children, ...props }: any) => <li {...props}>{children}</li>,
  Skeleton: (props: any) => <div {...props}>Loading...</div>,
  Modal: ({ children, opened, ..._rest }: any) =>
    opened ? <div data-testid="inexture-modal">{children}</div> : null,
  createTheme: vi.fn(),
  mergeMantineTheme: vi.fn()
}));

vi.mock('@mantine/core', () => ({
  Text: ({ children, component: Comp = 'span', ...props }: any) => {
    const Tag = Comp;
    return <Tag {...props}>{children}</Tag>;
  }
}));

// Mock @inexture/icons/ai
vi.mock('@inexture/icons/ai', () => ({
  AiFillGithub: () => <span>GitHub Icon</span>,
  AiFillEye: () => <span>Eye Icon</span>
}));

// Mock react-router
vi.mock('react-router', () => ({
  Link: ({ children, to, href, ...props }: any) => (
    <a href={href ?? to} {...props}>
      {children}
    </a>
  )
}));

// Mock dayjs
vi.mock('dayjs', () => {
  const mockDayjs = () => ({
    format: () => '2023-10-09'
  });
  return { default: mockDayjs };
});

// Global test utilities
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
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
    dispatchEvent: vi.fn()
  }))
});
