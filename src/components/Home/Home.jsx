import React from 'react';

import { useSelector } from 'react-redux';
import { Skeleton } from '@mui/material';
import JobList from '../JobList';
import styles from './Home.module.css';
import JobTabs from '../JobTabs';
import { activeTabSelector } from '../../selectors/tabs';
import { AVAILABLE_TABS } from '../../stores/tabs';

function Home() {
  const activeTab = useSelector(activeTabSelector);

  return (
    <div className={styles.root}>
      <JobTabs />
      {activeTab === AVAILABLE_TABS.all ? (
        <JobList />
      ) : (
        <div className={styles.devInProgress}>
          Under Construction
          <div className={styles.loader}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
