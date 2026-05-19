import { Chip, Stack } from '@mui/material';
import {
  FONT_WEIGHT_EXTRA_BOLD,
  TYPE_CHIP_SPACING,
  TYPE_CHIP_MEDIUM_HEIGHT_PX,
  TYPE_CHIP_SMALL_HEIGHT_PX,
} from '../../../shared/constants/ui';
import type { PokemonTypeSlot } from '../types/pokemon';
import { formatPokemonName } from '../utils/pokemonFormatters';

type TypeChipsProps = {
  types: PokemonTypeSlot[];
  size?: 'small' | 'medium';
  justifyContent?: 'flex-start' | 'flex-end' | 'center';
};

export const TypeChips = ({
  types,
  size = 'small',
  justifyContent = 'flex-start',
}: TypeChipsProps) => (
  <Stack
    direction="row"
    spacing={TYPE_CHIP_SPACING}
    flexWrap="wrap"
    useFlexGap
    justifyContent={justifyContent}
  >
    {types.map(({ type }) => (
      <Chip
        key={type.name}
        label={formatPokemonName(type.name)}
        size={size}
        sx={{
          bgcolor: 'grey.800',
          color: 'common.white',
          fontWeight: FONT_WEIGHT_EXTRA_BOLD,
          height: size === 'small' ? TYPE_CHIP_SMALL_HEIGHT_PX : TYPE_CHIP_MEDIUM_HEIGHT_PX,
        }}
      />
    ))}
  </Stack>
);
