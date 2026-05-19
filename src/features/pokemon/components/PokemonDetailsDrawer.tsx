import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import {
  DETAILS_DRAWER_WIDTH_PX,
  DETAILS_IMAGE_HEIGHT_PX,
  DETAILS_IMAGE_MAX_HEIGHT_PX,
  DETAILS_INLINE_STACK_SPACING,
  DETAILS_LOADING_MIN_HEIGHT_PX,
  DETAILS_SECTION_MARGIN_TOP,
  DETAILS_STACK_SPACING,
  DETAILS_STATS_SPACING,
  DRAWER_PADDING,
  FONT_WEIGHT_EXTRA_BOLD,
} from '../../../shared/constants/ui';
import type { Pokemon } from '../types/pokemon';
import {
  formatPokemonId,
  formatPokemonName,
  getPokemonImage,
} from '../utils/pokemonFormatters';
import { PokemonArtwork } from './PokemonArtwork';
import { PokemonMetricSummary } from './PokemonMetricSummary';
import { StatProgress } from './StatProgress';
import { TypeChips } from './TypeChips';

type PokemonDetailsDrawerProps = {
  pokemon: Pokemon | null;
  open: boolean;
  loading: boolean;
  error: string | null;
  onClose: () => void;
};

export const PokemonDetailsDrawer = ({
  pokemon,
  open,
  loading,
  error,
  onClose,
}: PokemonDetailsDrawerProps) => {
  const pokemonName = pokemon ? formatPokemonName(pokemon.name) : 'Pokemon';

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: DETAILS_DRAWER_WIDTH_PX },
          maxWidth: '100%',
        },
      }}
    >
      <Box sx={{ p: DRAWER_PADDING }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={DETAILS_INLINE_STACK_SPACING}
        >
          <Typography color="text.secondary" fontWeight={FONT_WEIGHT_EXTRA_BOLD}>
            {pokemon ? formatPokemonId(pokemon.id) : 'Pokemon'}
          </Typography>
          <IconButton aria-label="Close details" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        {loading ? (
          <Box
            sx={{
              display: 'grid',
              minHeight: DETAILS_LOADING_MIN_HEIGHT_PX,
              placeItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        ) : pokemon ? (
          <Stack spacing={DETAILS_STACK_SPACING}>
            <Typography component="h2" variant="h1">
              {pokemonName}
            </Typography>

            <PokemonArtwork
              imageUrl={getPokemonImage(pokemon)}
              name={pokemonName}
              height={DETAILS_IMAGE_HEIGHT_PX}
              maxHeight={DETAILS_IMAGE_MAX_HEIGHT_PX}
            />

            <TypeChips types={pokemon.types} />
            <PokemonMetricSummary pokemon={pokemon} />

            <Divider />

            <Box>
              <Typography variant="h2">Abilities</Typography>
              <Stack
                direction="row"
                flexWrap="wrap"
                useFlexGap
                spacing={1}
                sx={{ mt: DETAILS_SECTION_MARGIN_TOP }}
              >
                {pokemon.abilities.map(({ ability, is_hidden }) => (
                  <Chip
                    key={`${ability.name}-${is_hidden ? 'hidden' : 'visible'}`}
                    label={`${formatPokemonName(ability.name)}${is_hidden ? ' · hidden' : ''}`}
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Box>

            <Box>
              <Typography variant="h2">Stats</Typography>
              <Stack spacing={DETAILS_STATS_SPACING} sx={{ mt: DETAILS_SECTION_MARGIN_TOP }}>
                {pokemon.stats.map((stat) => (
                  <StatProgress key={stat.stat.name} stat={stat} />
                ))}
              </Stack>
            </Box>
          </Stack>
        ) : null}
      </Box>
    </Drawer>
  );
};
