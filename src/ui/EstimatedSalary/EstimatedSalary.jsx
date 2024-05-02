import React from 'react';

import { Tooltip } from '@mui/material';
import styles from './EstimatedSalary.module.css';

function EstimatedSalary({
  minJdSalary,
  maxJdSalary,
  salaryCurrencyCode,
  isOriginalSalary,
}) {
  return (
    <div className={styles.salary}>
      Estimated Salary:
      { minJdSalary && ` ${minJdSalary}k ${salaryCurrencyCode}` }
      {
          minJdSalary && maxJdSalary && (
            ` - ${maxJdSalary}k ${salaryCurrencyCode}`
          )
        }
      {!minJdSalary && !maxJdSalary && ' Not Available'}
      {
          !minJdSalary && maxJdSalary && (
            ` Upto ${maxJdSalary}k ${salaryCurrencyCode}`
          )
        }
      { isOriginalSalary && (
      <Tooltip
        title="Offered Salary Range"
        className={styles.estimate}
      >
        ✅
      </Tooltip>
      )}
    </div>
  );
}

export default EstimatedSalary;
