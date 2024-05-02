import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { AVAILABLE_TABS, setActiveTab } from '../../stores/tabs';
import { activeTabSelector } from '../../selectors/tabs';
import styles from './JobTabs.module.css';

function JobTabs() {
  const dispatch = useDispatch();
  const activeTab = useSelector(activeTabSelector);

  return (
    <div className={styles.tabContainer}>
      {Object.entries(AVAILABLE_TABS).map(([name, { label }]) => (
        <button
          type="button"
          className={classNames(
            styles.button,
            { [styles.active]: activeTab.label === label },
          )}
          onClick={() => dispatch(setActiveTab({ name }))}
          key={label}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default JobTabs;
