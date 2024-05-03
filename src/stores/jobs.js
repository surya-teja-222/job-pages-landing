import fetchJobsApi from '../api/jobs';
import { ITEMS_PER_PAGE } from '../utils/jobs';

const BASE_NAME = 'jobs';

const GET_JOBS_INIT = `${BASE_NAME}/GET_JOBS_INIT`;
const GET_JOBS_DONE = `${BASE_NAME}/GET_JOBS_DONE`;
const GET_JOBS_ERROR = `${BASE_NAME}/GET_JOBS_ERROR`;
const SET_MAX_LOADED_PAGE = `${BASE_NAME}/SET_MAX_LOADED_PAGE`;

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
    if (jobs[pageToLoad]?.data?.length) return;

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
  cardsLoading: false,
  cardsLoadingError: null,
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
        cardsLoading: true,
        cardsLoadingError: null,
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
        cardsLoading: false,
        cardsLoadingError: null,
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
        cardsLoading: false,
        cardsLoadingError: error,
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
