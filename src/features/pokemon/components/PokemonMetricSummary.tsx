import { Divider, Stack, Typography } from '@mui/material';
import { FONT_WEIGHT_EXTRA_BOLD } from '../../../shared/constants/ui';
import type { Pokemon } from '../types/pokemon';
import { formatHeight, formatWeight } from '../utils/pokemonFormatters';

type PokemonMetricSummaryProps = {
  pokemon: Pokemon;
};

type MetricItemProps = {
  label: string;
  value: string | number;
};

const MetricItem = ({ label, value }: MetricItemProps) => (
  <div>
    <Typography variant="caption" color="text.secondary" fontWeight={FONT_WEIGHT_EXTRA_BOLD}>
      {label}
    </Typography>
    <Typography fontWeight={FONT_WEIGHT_EXTRA_BOLD}>{value}</Typography>
  </div>
);

export const PokemonMetricSummary = ({ pokemon }: PokemonMetricSummaryProps) => (
  <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
    <MetricItem label="Height" value={formatHeight(pokemon.height)} />
    <MetricItem label="Weight" value={formatWeight(pokemon.weight)} />
    <MetricItem label="Base XP" value={pokemon.base_experience ?? 'N/A'} />
  </Stack>
);
