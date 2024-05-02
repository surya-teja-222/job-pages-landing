import { createSelector } from '@reduxjs/toolkit';

export const baseSelector = (state) => state.jobFilters;

// filters
export const filtersSelector = createSelector(
  baseSelector,
  (filters) => filters,
);
