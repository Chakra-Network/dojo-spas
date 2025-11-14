import { extendTheme } from '@chakra-ui/react'

// ZenDesk-inspired color palette - exact match
const colors = {
  brand: {
    50: '#e6f7f7',
    100: '#b3e6e6',
    200: '#80d4d4',
    300: '#4dc2c2',
    400: '#1ab0b0',
    500: '#03a69a', // Primary Zendesk teal
    600: '#028578',
    700: '#026356',
    800: '#014234',
    900: '#002112',
  },
  sidebar: {
    dark: '#0b3d3b', // Dark teal sidebar
    darkHover: '#0d4846',
    light: '#e8f5f4',
  },
  status: {
    new: '#7B68EE',
    open: '#03a69a',
    pending: '#FFA500',
    solved: '#22C55E',
    closed: '#6B7280',
  },
  priority: {
    urgent: '#EF4444',
    high: '#F97316',
    normal: '#3B82F6',
    low: '#6B7280',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
}

const fonts = {
  heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
}

const styles = {
  global: {
    body: {
      bg: 'gray.50',
      color: 'gray.800',
    },
    // Zendesk-style scrollbar
    '*::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '*::-webkit-scrollbar-track': {
      bg: 'gray.100',
    },
    '*::-webkit-scrollbar-thumb': {
      bg: 'gray.300',
      borderRadius: '4px',
    },
    '*::-webkit-scrollbar-thumb:hover': {
      bg: 'gray.400',
    },
  },
}

const components = {
  Button: {
    defaultProps: {
      colorScheme: 'brand',
    },
    baseStyle: {
      fontWeight: '500',
      borderRadius: 'md',
    },
    variants: {
      solid: {
        bg: 'brand.500',
        color: 'white',
        _hover: {
          bg: 'brand.600',
          _disabled: {
            bg: 'brand.500',
          },
        },
      },
      ghost: {
        _hover: {
          bg: 'gray.100',
        },
      },
    },
  },
  Badge: {
    baseStyle: {
      fontWeight: '600',
      textTransform: 'none',
      borderRadius: 'md',
      px: 2,
      py: 0.5,
    },
  },
  Input: {
    defaultProps: {
      focusBorderColor: 'brand.500',
    },
  },
  Textarea: {
    defaultProps: {
      focusBorderColor: 'brand.500',
    },
  },
  Select: {
    defaultProps: {
      focusBorderColor: 'brand.500',
    },
  },
}

// Responsive breakpoints matching Zendesk's layout
const breakpoints = {
  sm: '30em',   // 480px
  md: '48em',   // 768px
  lg: '62em',   // 992px
  xl: '80em',   // 1280px - Zendesk standard
  '2xl': '90em', // 1440px - Zendesk wide
}

const theme = extendTheme({
  colors,
  fonts,
  styles,
  components,
  breakpoints,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
})

export default theme
