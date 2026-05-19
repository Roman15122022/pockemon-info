import { Alert, Box, Grid, Skeleton, Stack, Typography } from '@mui/material';
import {
  CARD_CONTENT_PADDING,
  CARD_STACK_SPACING,
  GRID_SPACING,
  GRID_TOP_MARGIN,
  GRID_CARD_COLUMNS,
  SKELETON_BUTTON_HEIGHT_PX,
  SKELETON_BUTTON_WIDTH_PX,
  SKELETON_CARD_COUNT,
  SKELETON_CARD_HEIGHT_PX,
  SKELETON_ID_WIDTH,
  SKELETON_IMAGE_HEIGHT_PX,
  SKELETON_META_WIDTH,
  SKELETON_TITLE_HEIGHT_PX,
  SKELETON_TITLE_WIDTH,
} from '../../../shared/constants/ui';
import type { Pokemon } from '../types/pokemon';
import { PokemonCard } from './PokemonCard';

type PokemonGridProps = {
  pokemon: Pokemon[];
  loading: boolean;
  error: string | null;
  isFavorite: (id: number) => boolean;
  onOpenPokemon: (pokemon: Pokemon) => void;
  onToggleFavorite: (pokemon: Pokemon) => void;
};

const skeletonCards = Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => index);

export const PokemonGrid = ({
  pokemon,
  loading,
  error,
  isFavorite,
  onOpenPokemon,
  onToggleFavorite,
}: PokemonGridProps) => {
  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 3 }}>
        {error}
      </Alert>
    );
  }

  if (loading) {
    return (
      <Grid container spacing={GRID_SPACING} sx={{ mt: GRID_TOP_MARGIN }}>
        {skeletonCards.map((item) => (
          <Grid item {...GRID_CARD_COLUMNS} key={item}>
            <Stack
              spacing={CARD_STACK_SPACING}
              sx={{
                height: SKELETON_CARD_HEIGHT_PX,
                p: CARD_CONTENT_PADDING,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                bgcolor: 'background.paper',
              }}
            >
              <Skeleton width={SKELETON_ID_WIDTH} />
              <Skeleton variant="rounded" height={SKELETON_IMAGE_HEIGHT_PX} />
              <Skeleton width={SKELETON_TITLE_WIDTH} height={SKELETON_TITLE_HEIGHT_PX} />
              <Skeleton width={SKELETON_META_WIDTH} />
              <Skeleton
                variant="rounded"
                width={SKELETON_BUTTON_WIDTH_PX}
                height={SKELETON_BUTTON_HEIGHT_PX}
              />
            </Stack>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (pokemon.length === 0) {
    return (
      <Box
        sx={{
          mt: 3,
          p: 5,
          textAlign: 'center',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h2">No Pokemon found</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Try a different search query or clear the current filters.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={GRID_SPACING} sx={{ mt: GRID_TOP_MARGIN }}>
      {pokemon.map((item) => (
        <Grid item {...GRID_CARD_COLUMNS} key={item.id}>
          <PokemonCard
            pokemon={item}
            favorite={isFavorite(item.id)}
            onOpen={onOpenPokemon}
            onToggleFavorite={onToggleFavorite}
          />
        </Grid>
      ))}
    </Grid>
  );
};
