import React from 'react';

import { Skeleton } from '@mui/material';
import styles from './UnderDev.module.css';

function UnderDev() {
  return (
    <div className={styles.devInProgress}>
      Under Construction
      <div className={styles.loader}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </div>
    </div>
  );
}

export default UnderDev;
