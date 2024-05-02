import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';

import {
  Modal, Paper, Box, Button,
} from '@mui/material';
import styles from './JobCard.module.css';
import EstimatedSalary from '../EstimatedSalary';

function JobCard({
  job,
  isLastCard,
  fetchMoreJobs,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const ref = useRef(null);

  const {
    jdUid,
    jdLink,
    jobRole,
    location,
    minJdSalary,
    maxJdSalary,
    salaryCurrencyCode,
    minExp,
    jobDetailsFromCompany,
  } = job;

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

  // extracting company name from job.jdLink as it is a dummy data
  const companyName = jdLink
    .replace('https://', '')
    .replace('.com', '');

  // is isOriginalSalary -> Randomly generated for now
  // memoizing it to avoid re-rendering
  const isOriginalSalary = useMemo(() => Math.random() > 0.6, []);

  return (
    <Paper
      square={false}
      elevation={3}
      className={styles.jobCard}
      hover
      ref={ref}
    >
      <div className={styles.heroItems}>
        <img
          src={`https://picsum.photos/200/300?random=${jdUid}`}
          alt="Company Logo"
          className={styles.logo}
        />

        <div className={styles.heroDetails}>
          <a
            href={jdLink}
            className={styles.companyName}
            target="_blank"
            rel="noreferrer"
          >
            {companyName}
          </a>
          {jobRole && (<div className={styles.role}>{jobRole}</div>)}
          {location && (<div className={styles.location}>{location}</div>)}
        </div>
      </div>
      <EstimatedSalary
        minJdSalary={minJdSalary}
        maxJdSalary={maxJdSalary}
        salaryCurrencyCode={salaryCurrencyCode}
        isOriginalSalary={isOriginalSalary}
      />
      <div className={styles.jdContainer}>
        <div className={styles.about}>
          About Company
        </div>
        <div className={styles.jdContent}>
          {jobDetailsFromCompany}
        </div>
        <button
          type="button"
          className={styles.showMore}
          onClick={() => setIsModalOpen(true)}
        >
          Show More
        </button>
      </div>
      {minExp && (
        <div className={styles.expContainer}>
          <div className={styles.expLabel}>
            Minimum Experience
          </div>
          <div className={styles.expValue}>
            {`${minExp} ${minExp > 1 ? 'years' : 'year'}`}
          </div>
        </div>
      )}
      <Button
        variant="contained"
        className={styles.cta}
        onClick={() => setIsApplied(true)}
      >
        {
          !isApplied ? (
            <>
              <div className={styles.flash}>⚡</div>
              Easy Apply
            </>
          ) : (
            <>
              Applied
              <div className={styles.flash}>🔥</div>
            </>
          )
        }
      </Button>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Box className={styles.modalContent}>
          <div className={styles.modalHeader}>Job Description</div>
          <div>{jobDetailsFromCompany}</div>
        </Box>
      </Modal>
    </Paper>
  );
}

export default JobCard;
