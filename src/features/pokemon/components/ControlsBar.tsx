import type { FormEvent } from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import {
  CONTROL_BUTTON_MIN_HEIGHT_PX,
  CONTROLS_GRID_TEMPLATE_MD,
} from '../../../shared/constants/ui';
import type { NamedApiResource } from '../types/pokemon';
import { formatPokemonName } from '../utils/pokemonFormatters';

type ControlsBarProps = {
  searchValue: string;
  selectedType: string;
  types: NamedApiResource[];
  loading: boolean;
  loadingTypes: boolean;
  onSearchValueChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
};

export const ControlsBar = ({
  searchValue,
  selectedType,
  types,
  loading,
  loadingTypes,
  onSearchValueChange,
  onTypeChange,
  onSearchSubmit,
  onReset,
}: ControlsBarProps) => {
  const handleTypeChange = (event: SelectChangeEvent) => {
    onTypeChange(event.target.value);
  };

  return (
    <Box
      component="form"
      onSubmit={onSearchSubmit}
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: CONTROLS_GRID_TEMPLATE_MD,
        },
        gap: 2,
        alignItems: 'center',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        p: 2,
      }}
    >
      <TextField
        label="Search by name or ID"
        value={searchValue}
        onChange={(event) => onSearchValueChange(event.target.value)}
        disabled={loading}
        fullWidth
      />

      <FormControl fullWidth disabled={loadingTypes || loading}>
        <InputLabel id="pokemon-type-label">Type</InputLabel>
        <Select
          labelId="pokemon-type-label"
          label="Type"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <MenuItem value="">All types</MenuItem>
          {types.map((type) => (
            <MenuItem key={type.name} value={type.name}>
              {formatPokemonName(type.name)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        size="large"
        startIcon={<SearchIcon />}
        disabled={loading}
        sx={{ minHeight: CONTROL_BUTTON_MIN_HEIGHT_PX }}
      >
        Search
      </Button>

      <Button
        type="button"
        variant="outlined"
        size="large"
        startIcon={<RestartAltIcon />}
        onClick={onReset}
        disabled={loading}
        sx={{ minHeight: CONTROL_BUTTON_MIN_HEIGHT_PX }}
      >
        Reset
      </Button>
    </Box>
  );
};
