import { createTheme } from '@mui/material/styles';
import {
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_EXTRA_BOLD,
  HEADING_LINE_HEIGHT,
  SUBHEADING_LINE_HEIGHT,
} from '../shared/constants/ui';

export const theme = createTheme({
  palette: {
    background: {
      default: '#f6f7f9',
      paper: '#ffffff',
    },
    text: {
      primary: '#202124',
      secondary: '#5f6368',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '1.75rem',
      fontWeight: FONT_WEIGHT_EXTRA_BOLD,
      lineHeight: HEADING_LINE_HEIGHT,
    },
    h2: {
      fontSize: '1.35rem',
      fontWeight: FONT_WEIGHT_EXTRA_BOLD,
      lineHeight: SUBHEADING_LINE_HEIGHT,
    },
    button: {
      fontWeight: FONT_WEIGHT_BOLD,
      textTransform: 'none',
    },
  },
});
