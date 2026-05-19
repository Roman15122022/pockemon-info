import { Box, Container, Typography } from '@mui/material';
import {
  APP_CONTAINER_MAX_WIDTH,
  HEADER_PADDING_Y,
  HEADER_SUBTITLE_MARGIN_TOP,
} from '../../shared/constants/ui';

export const AppHeader = () => (
  <Box
    component="header"
    sx={{
      bgcolor: 'background.paper',
      borderBottom: '1px solid',
      borderColor: 'divider',
      py: HEADER_PADDING_Y,
    }}
  >
    <Container maxWidth={APP_CONTAINER_MAX_WIDTH}>
      <Typography component="h1" variant="h1">
        Pokemon Explorer
      </Typography>
    </Container>
  </Box>
);
