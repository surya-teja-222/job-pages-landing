import { createSelector } from '@reduxjs/toolkit';

export const baseSelector = (state) => state.tabs;

export const activeTabSelector = createSelector(
  baseSelector,
  (tabs) => tabs.activeTab,
);
