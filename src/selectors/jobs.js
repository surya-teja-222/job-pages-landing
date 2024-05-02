import { createSelector } from '@reduxjs/toolkit';

export const baseSelector = (state) => state.jobs;

export const allJobsSelector = createSelector(
  baseSelector,
  ({ jobs }) => {
    const allJobs = [];

    Object.entries(jobs).forEach(([pageNum, { data }]) => {
      if (data?.jdList?.length) {
        allJobs.push(...data.jdList.map((job, index) => (
          {
            ...job,
            pageNum,
            pageItemIndex: index,
          }
        )));
      }
    });

    return allJobs;
  },
);

export const maxLoadedPageSelector = createSelector(
  baseSelector,
  ({ maxLoadedPages }) => maxLoadedPages,
);
