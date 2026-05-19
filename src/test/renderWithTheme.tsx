import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../app/theme';

export const renderWithTheme = (ui: ReactElement) =>
  render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {ui}
    </ThemeProvider>,
  );
