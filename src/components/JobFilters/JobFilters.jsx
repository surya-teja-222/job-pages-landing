import React from 'react';

import AvaliableRolesSelect from './AvaliableRolesSelect';
import AvaliableCompaniesSelect from './AvailableCompaniesSelect';
import AvaliableLocationSelect from './AvailableLocationsSelect';
import MinExperienceSelector from './MinExperienceSelect';
import MinBasePay from './MinBasePay';
import AvaliableTechStackSelect from './TechStackSelect';
import RemoteOrOnSiteFilter from './RemoteOrOnSiteFilter';
import styles from './JobFilters.module.css';

function JobFilters() {
  return (
    <div className={styles.container}>
      <div className={styles.selects}>
        <AvaliableLocationSelect />
        <AvaliableRolesSelect />
        <AvaliableTechStackSelect />
        <AvaliableCompaniesSelect />
        <MinExperienceSelector />
        <MinBasePay />
      </div>
      <div className={styles.radio}>
        <RemoteOrOnSiteFilter />
      </div>
    </div>
  );
}

export default JobFilters;
