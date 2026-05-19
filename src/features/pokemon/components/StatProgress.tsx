import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import {
  FONT_WEIGHT_EXTRA_BOLD,
  FONT_WEIGHT_BLACK,
  PILL_BORDER_RADIUS_PX,
  STAT_BAR_HEIGHT_PX,
} from '../../../shared/constants/ui';
import { STAT_PROGRESS_MAX_VALUE } from '../../../shared/constants/pokemon';
import type { PokemonStat } from '../types/pokemon';
import { formatStatName } from '../utils/pokemonFormatters';

type StatProgressProps = {
  stat: PokemonStat;
};

export const StatProgress = ({ stat }: StatProgressProps) => (
  <Box>
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      <Typography variant="caption" color="text.secondary" fontWeight={FONT_WEIGHT_EXTRA_BOLD}>
        {formatStatName(stat.stat.name)}
      </Typography>
      <Typography variant="caption" fontWeight={FONT_WEIGHT_BLACK}>
        {stat.base_stat}
      </Typography>
    </Stack>
    <LinearProgress
      variant="determinate"
      value={Math.min(stat.base_stat, STAT_PROGRESS_MAX_VALUE)}
      sx={{
        height: STAT_BAR_HEIGHT_PX,
        borderRadius: PILL_BORDER_RADIUS_PX,
        bgcolor: 'grey.200',
        '& .MuiLinearProgress-bar': {
          borderRadius: PILL_BORDER_RADIUS_PX,
          bgcolor: 'grey.700',
        },
      }}
    />
  </Box>
);
