import type { KeyboardEvent, MouseEvent } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import {
  CARD_CONTENT_PADDING,
  CARD_HOVER_TRANSLATE_Y_PX,
  CARD_META_MARGIN_TOP,
  CARD_STACK_SPACING,
  CARD_TRANSITION_MS,
  FONT_WEIGHT_BOLD,
  POKEMON_CARD_HOVER_SHADOW,
  POKEMON_CARD_IMAGE_HEIGHT_PX,
  POKEMON_CARD_IMAGE_MAX_HEIGHT_PX,
} from '../../../shared/constants/ui';
import type { Pokemon } from '../types/pokemon';
import {
  formatHeight,
  formatPokemonId,
  formatPokemonName,
  formatWeight,
  getPokemonImage,
} from '../utils/pokemonFormatters';
import { PokemonArtwork } from './PokemonArtwork';
import { TypeChips } from './TypeChips';

type PokemonCardProps = {
  pokemon: Pokemon;
  favorite: boolean;
  onOpen: (pokemon: Pokemon) => void;
  onToggleFavorite: (pokemon: Pokemon) => void;
};

export const PokemonCard = ({
  pokemon,
  favorite,
  onOpen,
  onToggleFavorite,
}: PokemonCardProps) => {
  const pokemonName = formatPokemonName(pokemon.name);

  const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onToggleFavorite(pokemon);
  };

  const stopFavoriteKeyPropagation = (event: KeyboardEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen(pokemon);
    }
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onOpen(pokemon)}
      onKeyDown={handleKeyDown}
      sx={{
        height: '100%',
        cursor: 'pointer',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 'none',
        transition: `border-color ${CARD_TRANSITION_MS}ms ease, box-shadow ${CARD_TRANSITION_MS}ms ease, transform ${CARD_TRANSITION_MS}ms ease`,
        '&:hover, &:focus-visible': {
          borderColor: 'grey.500',
          boxShadow: POKEMON_CARD_HOVER_SHADOW,
          outline: 'none',
          transform: `translateY(${CARD_HOVER_TRANSLATE_Y_PX}px)`,
        },
      }}
    >
      <CardContent sx={{ height: '100%', p: CARD_CONTENT_PADDING }}>
        <Stack spacing={CARD_STACK_SPACING} sx={{ height: '100%' }}>
          <Stack direction="row" justifyContent="space-between" spacing={1} alignItems="flex-start">
            <Typography color="text.secondary" fontWeight={FONT_WEIGHT_BOLD}>
              {formatPokemonId(pokemon.id)}
            </Typography>
            <TypeChips types={pokemon.types} justifyContent="flex-end" />
          </Stack>

          <PokemonArtwork
            imageUrl={getPokemonImage(pokemon)}
            name={pokemonName}
            height={POKEMON_CARD_IMAGE_HEIGHT_PX}
            maxHeight={POKEMON_CARD_IMAGE_MAX_HEIGHT_PX}
          />

          <Box sx={{ flexGrow: 1 }}>
            <Typography component="h2" variant="h2">
              {pokemonName}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: CARD_META_MARGIN_TOP }}>
              {formatHeight(pokemon.height)} · {formatWeight(pokemon.weight)}
            </Typography>
          </Box>

          <Box>
            <Button
              variant="outlined"
              color={favorite ? 'error' : 'inherit'}
              startIcon={favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              onClick={handleFavoriteClick}
              onKeyDown={stopFavoriteKeyPropagation}
            >
              {favorite ? 'Unlike' : 'Like'}
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
