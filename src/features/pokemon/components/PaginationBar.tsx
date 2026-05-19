import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, Stack, Typography } from '@mui/material';
import { EMPTY_COUNT, FIRST_PAGE, POKEMON_PAGE_SIZE } from '../../../shared/constants/pokemon';
import { FONT_WEIGHT_BOLD } from '../../../shared/constants/ui';
import { getTotalPages } from '../../../shared/utils/pagination';

type PaginationBarProps = {
  page: number;
  totalCount: number;
  visibleCount: number;
  loading: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export const PaginationBar = ({
  page,
  totalCount,
  visibleCount,
  loading,
  onPrevious,
  onNext,
}: PaginationBarProps) => {
  const totalPages = getTotalPages(totalCount, POKEMON_PAGE_SIZE);
  const canGoPrevious = page > FIRST_PAGE && !loading;
  const canGoNext = totalPages > EMPTY_COUNT && page < totalPages && !loading;

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'stretch', sm: 'center' }}
      justifyContent="space-between"
      spacing={2}
    >
      <Typography color="text.secondary" fontWeight={FONT_WEIGHT_BOLD}>
        Showing {visibleCount} of {totalCount} results
        {totalPages > EMPTY_COUNT ? ` · page ${page} / ${totalPages}` : ''}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'stretch', sm: 'flex-end' } }}>
        <Button
          variant="outlined"
          startIcon={<ChevronLeftIcon />}
          onClick={onPrevious}
          disabled={!canGoPrevious}
          sx={{ flex: { xs: 1, sm: 'initial' } }}
        >
          Prev
        </Button>
        <Button
          variant="outlined"
          endIcon={<ChevronRightIcon />}
          onClick={onNext}
          disabled={!canGoNext}
          sx={{ flex: { xs: 1, sm: 'initial' } }}
        >
          Next
        </Button>
      </Box>
    </Stack>
  );
};
