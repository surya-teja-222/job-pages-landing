import React from 'react';

import { useSelector } from 'react-redux';
import JobList from '../JobList';
import styles from './Home.module.css';
import JobTabs from '../JobTabs';
import { activeTabSelector } from '../../selectors/tabs';
import { AVAILABLE_TABS } from '../../stores/tabs';
import UnderDev from '../../ui/UnderDev';
import JobFilters from '../JobFilters';

function Home() {
  const activeTab = useSelector(activeTabSelector);

  return (
    <div className={styles.root}>
      <JobTabs />
      {activeTab === AVAILABLE_TABS.all ? (
        <div>
          <JobFilters />
          <JobList />
        </div>
      ) : (
        <UnderDev />
      )}
    </div>
  );
}

export default Home;
