import React from 'react';

import { Skeleton, Paper } from '@mui/material';
import styles from './JobCardLoading.module.css';

function JobCardLoading() {
  return (
    <Paper
      square={false}
      elevation={3}
      className={styles.jobCard}
      hover
    >
      <div className={styles.loader}>
        <div className={styles.hero}>
          <Skeleton
            variant="circular"
            width={70}
            height={60}
          />
          <div className={styles.heroText}>
            <Skeleton variant="text" sx={{ fontSize: '10px' }} />
            <Skeleton variant="text" sx={{ fontSize: '12px' }} />
            <Skeleton variant="text" sx={{ fontSize: '10px' }} />
          </div>
        </div>

        <Skeleton variant="rectangular" height={300} style={{ marginTop: '10px' }} />
        <Skeleton variant="rectangular" height={100} style={{ marginTop: '10px' }} />
      </div>
    </Paper>
  );
}

export default JobCardLoading;
