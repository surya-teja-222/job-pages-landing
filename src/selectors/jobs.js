import { createSelector } from '@reduxjs/toolkit';
import { filtersSelector } from './jobFilters';

export const baseSelector = (state) => state.jobs;

export const allJobsSelector = createSelector(
  baseSelector,
  ({ jobs }) => {
    const allJobs = [];

    Object.entries(jobs).forEach(([, { data }]) => {
      if (data?.jdList?.length) allJobs.push(...data.jdList);
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
  (data) => ({
    isLoading: data.cardsLoading,
    erorr: data.cardsLoadingError,
  }),
);

// filters data
export const uniqueCompaniesSelector = createSelector(
  allJobsSelector,
  (jobs) => {
    const companies = jobs.map(({ companyName }) => (
      companyName
    ));
    companies.sort();
    return [...new Set(companies)];
  },
);

export const uniqueLocationsSelector = createSelector(
  allJobsSelector,
  (jobs) => {
    const locations = jobs.map(({ location }) => location);
    locations.sort();
    return [...new Set(locations)];
  },
);

export const availableTechStackSelector = createSelector(
  allJobsSelector,
  (jobs) => {
    const techStack = jobs.map(({ jobRole }) => jobRole);
    techStack.sort();
    return [...new Set(techStack)];
  },
);

export const availableRolesSelector = createSelector(
  allJobsSelector,
  (jobs) => {
    const roles = jobs.map(({ jobRole }) => jobRole);
    roles.sort();
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
        companyName,
        location,
        jobRole,
        minJdSalary,
      } = job;

      const isExpValid = minExpFromJob >= minExp;
      const isCompanyValid = !preferredCompanies || preferredCompanies.includes(
        companyName,
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
