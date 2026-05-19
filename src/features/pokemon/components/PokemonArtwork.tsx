import { Box, Typography } from '@mui/material';
import {
  FONT_WEIGHT_BOLD,
  POKEMON_IMAGE_MAX_WIDTH,
} from '../../../shared/constants/ui';

type PokemonArtworkProps = {
  imageUrl: string | null;
  name: string;
  height: number;
  maxHeight: number;
};

export const PokemonArtwork = ({
  imageUrl,
  name,
  height,
  maxHeight,
}: PokemonArtworkProps) => (
  <Box
    sx={{
      display: 'grid',
      placeItems: 'center',
      height,
      borderRadius: 3,
      bgcolor: '#f2f3f5',
      overflow: 'hidden',
    }}
  >
    {imageUrl ? (
      <Box
        component="img"
        src={imageUrl}
        alt={name}
        loading="lazy"
        sx={{
          maxWidth: POKEMON_IMAGE_MAX_WIDTH,
          maxHeight,
          objectFit: 'contain',
        }}
      />
    ) : (
      <Typography color="text.secondary" fontWeight={FONT_WEIGHT_BOLD}>
        No image
      </Typography>
    )}
  </Box>
);
