import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { allJobsSelector } from '../../selectors/jobs';
import { fetchJobsFromApi } from '../../stores/jobs';

function JobList() {
  const dispatch = useDispatch();
  const allJobData = useSelector(allJobsSelector);

  useEffect(() => {
    dispatch(fetchJobsFromApi({
      limit: 10,
      offset: 0,
    }));
  }, [dispatch]);

  return (
    <>
      <h1>JobList</h1>
      <div>
        {allJobData.map((job) => (
          (
            <div key={job.jdUid}>
              <h2>{job.jobRole}</h2>
              <p>{job.location}</p>
              <p>{job.maxExp}</p>
              <p>{job.minExp}</p>
              <p>{job.maxJdSalary}</p>
              <p>{job.minJdSalary}</p>
              <p>{job.salaryCurrencyCode}</p>
              <p>{job.jdLink}</p>
              <p>{job.jdUid}</p>
              <p>{job.jobDetailsFromCompany}</p>
              <p>{job.pageNum}</p>
              <p>
                job.pageItemIndex:
                {job.pageItemIndex}
              </p>
            </div>
          )
        ))}
      </div>
    </>
  );
}

export default JobList;
