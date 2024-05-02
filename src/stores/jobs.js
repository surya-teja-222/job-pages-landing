import fetchJobsApi from '../api/jobs';

const BASE_NAME = 'jobs';

const GET_JOBS_INIT = `${BASE_NAME}/GET_JOBS_INIT`;
const GET_JOBS_DONE = `${BASE_NAME}/GET_JOBS_DONE`;
const GET_JOBS_ERROR = `${BASE_NAME}/GET_JOBS_ERROR`;
const SET_MAX_LOADED_PAGE = `${BASE_NAME}/SET_MAX_LOADED_PAGE`;

const ITEMS_PER_PAGE = 10;

function initGetJobs(pageNumber) {
  return {
    type: GET_JOBS_INIT,
    payload: {
      pageNumber,
    },
  };
}

function getJobDone(jobs, pageNumber) {
  return {
    type: GET_JOBS_DONE,
    payload: {
      jobs,
      pageNumber,
    },
  };
}

function errorGetJobs(error, pageNumber) {
  return {
    type: GET_JOBS_ERROR,
    payload: {
      error,
      pageNumber,
    },
  };
}

function setMaxLoadedPage(maxLoadedPage) {
  return {
    type: SET_MAX_LOADED_PAGE,
    payload: {
      maxLoadedPage,
    },
  };
}

export function fetchJobsOfPage({
  pageToLoad,
}) {
  return async (dispatch, getState) => {
    const { jobs } = getState().jobs;
    if (jobs[pageToLoad]) return;

    dispatch(initGetJobs(pageToLoad));

    try {
      const jobsData = await fetchJobsApi({
        limit: ITEMS_PER_PAGE,
        offset: (pageToLoad * ITEMS_PER_PAGE),
      });
      dispatch(getJobDone(jobsData, pageToLoad));
      dispatch(setMaxLoadedPage(pageToLoad));
    } catch (error) {
      dispatch(errorGetJobs(error, pageToLoad));
    }
  };
}

const initialState = {
  jobs: {},
  maxLoadedPages: -1,
};

function jobsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_JOBS_INIT: {
      const { pageNumber } = action.payload;
      return {
        ...state,
        jobs: {
          ...state.jobs,
          [pageNumber]: {
            isLoading: true,
            error: null,
            data: [],
          },
        },
      };
    }
    case GET_JOBS_DONE: {
      const { jobs, pageNumber } = action.payload;
      return {
        ...state,
        jobs: {
          ...state.jobs,
          [pageNumber]: {
            ...state.jobs[pageNumber],
            isLoading: false,
            data: jobs,
          },
        },
      };
    }
    case GET_JOBS_ERROR: {
      const { error, pageNumber } = action.payload;
      return {
        ...state,
        jobs: {
          ...state.jobs,
          [pageNumber]: {
            isLoading: false,
            error,
            data: [],
          },
        },
      };
    }
    case SET_MAX_LOADED_PAGE: {
      const { maxLoadedPage } = action.payload;
      return {
        ...state,
        maxLoadedPages: maxLoadedPage,
      };
    }
    default:
      return state;
  }
}

export default jobsReducer;
