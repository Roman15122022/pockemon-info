import { EMPTY_COUNT, FIRST_PAGE, MIN_TOTAL_PAGES, POKEMON_PAGE_SIZE } from '../constants/pokemon';

export const getPageOffset = (page: number, pageSize = POKEMON_PAGE_SIZE) =>
  (Math.max(page, FIRST_PAGE) - FIRST_PAGE) * pageSize;

export const getTotalPages = (totalCount: number, pageSize = POKEMON_PAGE_SIZE) => {
  if (totalCount === EMPTY_COUNT) {
    return EMPTY_COUNT;
  }

  return Math.max(Math.ceil(totalCount / pageSize), MIN_TOTAL_PAGES);
};
