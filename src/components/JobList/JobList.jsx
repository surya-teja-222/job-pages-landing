import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { allJobsSelector, maxLoadedPageSelector } from '../../selectors/jobs';
import { fetchJobsOfPage } from '../../stores/jobs';
import JobCard from '../../ui/JobCard';
import styles from './JobList.module.css';

function JobList() {
  const dispatch = useDispatch();
  const allJobData = useSelector(allJobsSelector);
  const maxPagesLoaded = useSelector(maxLoadedPageSelector);

  const fetchMoreJobs = useCallback(() => {
    dispatch(fetchJobsOfPage({ pageToLoad: maxPagesLoaded + 1 }));
  }, [dispatch, maxPagesLoaded]);

  useEffect(() => {
    if (maxPagesLoaded === -1) {
      // if no pages are loaded, load the first page
      fetchMoreJobs();
    }
  }, [fetchMoreJobs, maxPagesLoaded]);

  return (
    <>
      <h1>JobList</h1>
      <div className={styles.jobList}>
        {allJobData.map((job) => (
          <JobCard
            key={job.jdUid}
            job={job}
            isLastCard={
              // checking isLastCard && Card Index is 9
              !!(
                parseInt(job.pageNum, 10) === maxPagesLoaded
                && job.pageItemIndex === 9
              )
            }
            fetchMoreJobs={fetchMoreJobs}
          />
        ))}
      </div>
    </>
  );
}

export default JobList;
