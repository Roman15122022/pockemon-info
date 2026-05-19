import { Alert, Box, Container, Stack } from '@mui/material';
import { AppHeader } from './components/AppHeader';
import {
  APP_CONTAINER_MAX_WIDTH,
  APP_CONTENT_STACK_SPACING,
  APP_MIN_WIDTH_PX,
  APP_MAIN_MIN_HEIGHT,
  APP_MAIN_PADDING_Y,
  APP_STACK_SPACING,
} from '../shared/constants/ui';
import { useFavoritePokemon } from '../features/favorites/hooks/useFavoritePokemon';
import { ControlsBar } from '../features/pokemon/components/ControlsBar';
import { PaginationBar } from '../features/pokemon/components/PaginationBar';
import { PokemonDetailsDrawer } from '../features/pokemon/components/PokemonDetailsDrawer';
import { PokemonGrid } from '../features/pokemon/components/PokemonGrid';
import { usePokemonCatalog } from '../features/pokemon/hooks/usePokemonCatalog';
import { usePokemonDetails } from '../features/pokemon/hooks/usePokemonDetails';

const App = () => {
  const pokemonDetails = usePokemonDetails();
  const catalog = usePokemonCatalog({ onPokemonFound: pokemonDetails.openDetails });
  const favorites = useFavoritePokemon();

  return (
    <Box
      sx={{
        minWidth: APP_MIN_WIDTH_PX,
        minHeight: APP_MAIN_MIN_HEIGHT,
        bgcolor: 'background.default',
      }}
    >
      <AppHeader />

      <Container maxWidth={APP_CONTAINER_MAX_WIDTH} component="main" sx={{ py: APP_MAIN_PADDING_Y }}>
        <Stack spacing={APP_STACK_SPACING}>
          <ControlsBar
            searchValue={catalog.searchValue}
            selectedType={catalog.selectedType}
            types={catalog.types}
            loading={catalog.loading}
            loadingTypes={catalog.loadingTypes}
            onSearchValueChange={catalog.setSearchValue}
            onTypeChange={catalog.handleTypeChange}
            onSearchSubmit={catalog.handleSearchSubmit}
            onReset={catalog.handleReset}
          />

          {catalog.typeError ? <Alert severity="warning">{catalog.typeError}</Alert> : null}

          <Stack spacing={APP_CONTENT_STACK_SPACING}>
            <PaginationBar
              page={catalog.page}
              totalCount={catalog.totalCount}
              visibleCount={catalog.pokemon.length}
              loading={catalog.loading || catalog.searchMode}
              onPrevious={catalog.handlePrevious}
              onNext={catalog.handleNext}
            />

            <PokemonGrid
              pokemon={catalog.pokemon}
              loading={catalog.loading}
              error={catalog.listError}
              isFavorite={favorites.isFavorite}
              onOpenPokemon={pokemonDetails.openDetails}
              onToggleFavorite={favorites.togglePokemonFavorite}
            />
          </Stack>
        </Stack>
      </Container>

      <PokemonDetailsDrawer
        pokemon={pokemonDetails.detailsPokemon}
        open={pokemonDetails.drawerOpen}
        loading={pokemonDetails.detailsLoading}
        error={pokemonDetails.detailsError}
        onClose={pokemonDetails.closeDetails}
      />
    </Box>
  );
};

export default App;
