import React, { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { filteredJobsSelector, lastCardLoaderSelector, maxLoadedPageSelector } from '../../selectors/jobs';
import { fetchJobsOfPage } from '../../stores/jobs';
import JobCard from '../../ui/JobCard';
import styles from './JobList.module.css';
import JobCardLoading from '../../ui/JobCardLoading';

function JobList() {
  const dispatch = useDispatch();
  const allJobData = useSelector(filteredJobsSelector);
  const maxPagesLoaded = useSelector(maxLoadedPageSelector);
  const {
    isLoading,
    erorr,
  } = useSelector(lastCardLoaderSelector);

  const fetchMoreJobs = useCallback(() => {
    dispatch(fetchJobsOfPage({ pageToLoad: maxPagesLoaded + 1 }));
  }, [dispatch, maxPagesLoaded]);

  useEffect(() => {
    if (maxPagesLoaded === -1) {
      // if no pages are loaded, load the first page
      fetchMoreJobs();
    }
  }, [fetchMoreJobs, maxPagesLoaded]);

  const jobsLength = allJobData?.length;

  const loaderComponent = useMemo(() => (
    Array.from({ length: 7 }).map((_, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <JobCardLoading key={idx} />
    ))
  ), []);

  return (
    <div className={styles.jobList}>
      {allJobData?.map((job, idx) => (
        <JobCard
          key={job.jdUid}
          job={job}
          isLastCard={idx === jobsLength - 1}
          fetchMoreJobs={fetchMoreJobs}
        />
      ))}
      {isLoading && (loaderComponent)}
      {!!erorr && (
        <div className={styles.error}>
          Failed To Fetch More Jobs
          <Button onClick={fetchMoreJobs}>Retry</Button>
        </div>
      )}
    </div>
  );
}

export default JobList;
