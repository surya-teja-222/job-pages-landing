import fetchJobsApi from '../api/jobs';

const BASE_NAME = 'jobs';

const INIT_GET_JOBS = `${BASE_NAME}/INIT_GET_JOBS`;
const SUCCESS_GET_JOBS = `${BASE_NAME}/SUCCESS_GET_JOBS`;
const ERROR_GET_JOBS = `${BASE_NAME}/ERROR_GET_JOBS`;
const SET_MAX_LOADED_PAGE = `${BASE_NAME}/SET_MAX_LOADED_PAGE`;

const ITEMS_PER_PAGE = 10;

function initGetJobs(pageNumber) {
  return {
    type: INIT_GET_JOBS,
    payload: {
      pageNumber,
    },
  };
}

function successGetJobs(jobs, pageNumber) {
  return {
    type: SUCCESS_GET_JOBS,
    payload: {
      jobs,
      pageNumber,
    },
  };
}

function errorGetJobs(error, pageNumber) {
  return {
    type: ERROR_GET_JOBS,
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

export function fetchJobsFromApi({
  limit,
  offset,
}) {
  return async (dispatch) => {
    const pageNumber = offset / ITEMS_PER_PAGE;

    dispatch(initGetJobs(pageNumber));
    try {
      const jobs = await fetchJobsApi({
        limit,
        offset,
      });
      dispatch(successGetJobs(jobs, pageNumber));
      dispatch(setMaxLoadedPage(pageNumber));
    } catch (error) {
      dispatch(errorGetJobs(error, pageNumber));
    }
  };
}

const initialState = {
  jobs: {},
  maxLoadedPages: 0,
};

function jobsReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_GET_JOBS: {
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
    case SUCCESS_GET_JOBS: {
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
    case ERROR_GET_JOBS: {
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
