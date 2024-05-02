const BASE_NAME = 'counter';

export const INCREMENT = `${BASE_NAME}/INCREMENT`;
export const DECREMENT = `${BASE_NAME}/DECREMENT`;
export const RESET = `${BASE_NAME}/RESET`;

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const reset = () => ({ type: RESET });

const initialState = 0;

export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    case RESET:
      return initialState;
    default:
      return state;
  }
}
