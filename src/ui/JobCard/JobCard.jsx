import React, { useEffect, useMemo, useRef } from 'react';

import styles from './JobCard.module.css';

function JobCard({
  job,
  isLastCard,
  fetchMoreJobs,
}) {
  const ref = useRef(null);

  const observer = useMemo(() => new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) fetchMoreJobs();
  }, {
    root: null,
    rootMargin: '20px',
    threshold: 1.0,
  }), [fetchMoreJobs]);

  useEffect(() => {
    if (isLastCard && ref.current) {
      observer.observe(ref.current);
    }
  }, [isLastCard, observer]);

  return (
    <div className={styles.JobCard} ref={ref}>
      <h1>
        {
          isLastCard
            ? 'Last Card'
            : 'Not Last Card'
        }
      </h1>
      <div>
        {
          JSON.stringify(job, null, 2).slice(0, 100)
        }
      </div>
    </div>
  );
}

export default JobCard;
