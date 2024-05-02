import { AuthActionTypes,  SearchState } from "../actions/typeAction";

const initialState: SearchState = {
  searchName: "",
  sortBy: "lastName",
  sortOrder: "asc",
  page: 1,
  limit: 3,
};

const searchReducer = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case "changeSearch":
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export default searchReducer;
