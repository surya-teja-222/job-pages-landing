async function fetchJobs({
  limit = 10,
  offset = 0,
}) {
  const JobsURL = 'https://api.weekday.technology/adhoc/getSampleJdJSON';
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    limit,
    offset,
  };

  const response = await fetch(JobsURL, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }

  const jobs = await response.json();
  return jobs;
}

export default fetchJobs;
