import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filteredJobsSelector, maxLoadedPageSelector } from '../../selectors/jobs';
import { fetchJobsOfPage } from '../../stores/jobs';
import JobCard from '../../ui/JobCard';
import styles from './JobList.module.css';

function JobList() {
  const dispatch = useDispatch();
  const allJobData = useSelector(filteredJobsSelector);
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

  const jobsLength = allJobData.length;

  return (
    <div className={styles.jobList}>
      {allJobData.map((job, idx) => (
        <JobCard
          key={job.jdUid}
          job={job}
          isLastCard={idx === jobsLength - 1}
          fetchMoreJobs={fetchMoreJobs}
        />
      ))}
    </div>
  );
}

export default JobList;
