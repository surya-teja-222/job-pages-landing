import { createSelector } from '@reduxjs/toolkit';
import { filtersSelector } from './jobFilters';

export const baseSelector = (state) => state.jobs;

export const allJobsSelector = createSelector(
  baseSelector,
  ({ jobs }) => {
    const allJobs = [];

    Object.entries(jobs).forEach(([pageNum, { data }]) => {
      if (data?.jdList?.length) {
        const jobData = data.jdList.map((job, index) => (
          { ...job, pageNum, pageItemIndex: index }
        ));

        allJobs.push(...jobData);
      }
    });

    return allJobs;
  },
);

export const maxLoadedPageSelector = createSelector(
  baseSelector,
  ({ maxLoadedPages }) => maxLoadedPages,
);

export const lastCardLoaderSelector = createSelector(
  baseSelector,
  ({ jobs }) => {
    const lastPage = Object.values(jobs).pop() || {};

    return {
      isLoading: lastPage.isLoading,
      erorr: lastPage.error,
    };
  },
);

// filters data
export const uniqueCompaniesSelector = createSelector(
  allJobsSelector,
  (jobs) => {
    const companies = jobs.map(({ jdLink }) => (
      jdLink
        .replace('https://', '')
        .replace('.com', '')
    ));

    return [...new Set(companies)];
  },
);

export const uniqueLocationsSelector = createSelector(
  allJobsSelector,
  (jobs) => {
    const locations = jobs.map(({ location }) => location);

    return [...new Set(locations)];
  },
);

export const availableTechStackSelector = createSelector(
  allJobsSelector,
  (jobs) => {
    const techStack = jobs.map(({ jobRole }) => jobRole);

    return [...new Set(techStack)];
  },
);

export const availableRolesSelector = createSelector(
  allJobsSelector,
  (jobs) => {
    const roles = jobs.map(({ jobRole }) => jobRole);

    return [...new Set(roles)];
  },
);

export const filteredJobsSelector = createSelector(
  allJobsSelector,
  filtersSelector,
  (jobs, filters) => {
    const {
      minExp,
      preferredCompanies,
      preferredLocations,
      prefersOnsiteOrRemote,
      preferedTechStack,
      preferredRoles,
      minBasePay,
    } = filters;

    const filteredJobs = jobs.filter((job) => {
      const {
        minExp: minExpFromJob,
        jdLink,
        location,
        jobRole,
        minJdSalary,
      } = job;

      const isExpValid = minExpFromJob >= minExp;
      const isCompanyValid = !preferredCompanies || preferredCompanies.includes(
        jdLink
          .replace('https://', '')
          .replace('.com', ''),
      );
      const isLocationValid = !preferredLocations || preferredLocations.includes(location);
      const isOnsiteOrRemoteValid = !prefersOnsiteOrRemote || (
        prefersOnsiteOrRemote === 'remote'
        && location === 'remote'
      );
      const isTechStackValid = !preferedTechStack || preferedTechStack.includes(jobRole);
      const isRoleValid = !preferredRoles || preferredRoles.includes(jobRole);
      const isBasePayValid = minJdSalary >= minBasePay;

      return isExpValid
        && isCompanyValid
        && isLocationValid
        && isOnsiteOrRemoteValid
        && isTechStackValid
        && isRoleValid
        && isBasePayValid;
    });

    return filteredJobs;
  },
);
