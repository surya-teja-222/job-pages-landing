const BASE_NAME = 'job_filters';

const SET_MIN_EXP = `${BASE_NAME}/SET_MIN_EXP`;
const SET_PREFERRED_COMPANIES = `${BASE_NAME}/SET_PREFERRED_COMPANIES`;
const SET_PREFERRED_LOCATIONS = `${BASE_NAME}/SET_PREFERRED_LOCATIONS`;
const SET_PREFERS_ONSITE_OR_REMOTE = `${BASE_NAME}/SET_PREFERS_ONSITE_OR_REMOTE`;
const SET_PREFERED_TECH_STACK = `${BASE_NAME}/SET_PREFERED_TECH_STACK`;
const SET_PREFERRED_ROLES = `${BASE_NAME}/SET_PREFERRED_ROLES`;
const SET_MIN_BASE_PAY = `${BASE_NAME}/SET_MIN_BASE_PAY`;

export function setMinExp(minExp) {
  return {
    type: SET_MIN_EXP,
    payload: {
      minExp,
    },
  };
}

export function setPreferredCompanies(preferredCompanies) {
  return {
    type: SET_PREFERRED_COMPANIES,
    payload: {
      preferredCompanies: preferredCompanies.length ? preferredCompanies : null,
    },
  };
}

export function setPreferredLocations(preferredLocations) {
  return {
    type: SET_PREFERRED_LOCATIONS,
    payload: {
      preferredLocations: preferredLocations.length ? preferredLocations : null,
    },
  };
}

export function setPrefersOnsiteOrRemote(prefersOnsiteOrRemote) {
  return {
    type: SET_PREFERS_ONSITE_OR_REMOTE,
    payload: {
      prefersOnsiteOrRemote,
    },
  };
}

export function setPreferedTechStack(preferedTechStack) {
  return {
    type: SET_PREFERED_TECH_STACK,
    payload: {
      preferedTechStack: preferedTechStack.length ? preferedTechStack : null,
    },
  };
}

export function setPreferredRoles(preferredRoles) {
  return {
    type: SET_PREFERRED_ROLES,
    payload: {
      preferredRoles: preferredRoles.length ? preferredRoles : null,
    },
  };
}

export function setMinBasePay(minBasePay) {
  return {
    type: SET_MIN_BASE_PAY,
    payload: {
      minBasePay,
    },
  };
}

const initialState = {
  minExp: 0,
  preferredCompanies: null,
  preferredLocations: null,
  prefersOnsiteOrRemote: null,
  preferedTechStack: null,
  preferredRoles: null,
  minBasePay: 0,
};

function jobFiltersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MIN_EXP: {
      const { minExp } = action.payload;
      return {
        ...state,
        minExp,
      };
    }
    case SET_PREFERRED_COMPANIES: {
      const { preferredCompanies } = action.payload;
      return {
        ...state,
        preferredCompanies,
      };
    }
    case SET_PREFERRED_LOCATIONS: {
      const { preferredLocations } = action.payload;
      return {
        ...state,
        preferredLocations,
      };
    }
    case SET_PREFERS_ONSITE_OR_REMOTE: {
      const { prefersOnsiteOrRemote } = action.payload;
      return {
        ...state,
        prefersOnsiteOrRemote,
      };
    }
    case SET_PREFERED_TECH_STACK: {
      const { preferedTechStack } = action.payload;
      return {
        ...state,
        preferedTechStack,
      };
    }
    case SET_PREFERRED_ROLES: {
      const { preferredRoles } = action.payload;
      return {
        ...state,
        preferredRoles,
      };
    }
    case SET_MIN_BASE_PAY: {
      const { minBasePay } = action.payload;
      return {
        ...state,
        minBasePay,
      };
    }
    default:
      return state;
  }
}

export default jobFiltersReducer;
