export const theme = {
  colors: {
    background: '#000000',
    primary: '#FF69B4',
    secondary: '#1E90FF',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body: {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    circle: '50%',
  },
  transitions: {
    default: '0.3s ease-in-out',
  },
};

export type Theme = typeof theme;
