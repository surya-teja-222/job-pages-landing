const BASE_NAME = 'tabs';

const SET_TAB = `${BASE_NAME}/SET_TAB`;

export const AVAILABLE_TABS = {
  applied: { label: 'Applied Jobs' },
  all: { label: 'Search Jobs' },
  suggested: { label: 'Suggested Jobs' },
};

const initialState = {
  activeTab: AVAILABLE_TABS.all,
};

export const setActiveTab = ({ name }) => ({
  type: SET_TAB,
  payload: name,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TAB:
      return {
        ...state,
        activeTab: AVAILABLE_TABS[action.payload],
      };
    default:
      return state;
  }
}
