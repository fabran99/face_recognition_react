import { GET_ASSETS } from "../actions/types";

var initialState = {
  error: false,
};

// var cached_assets = window.localStorage.getItem("assets");

// if (cached_assets) {
//   initialState = { ...initialState, ...JSON.parse(cached_assets) };
// }
export default (state = initialState, action) => {
  switch (action.type) {
    // case ERROR_GET_ASSETS:
    //   return {
    //     ...state,
    //     error: true,
    //   };
    default:
      return state;
  }
};
