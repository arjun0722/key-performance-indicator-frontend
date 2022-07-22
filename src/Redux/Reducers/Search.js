import { ACTION } from "../Action_Constants";

const initialState = "";

export default function SearchReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.SEARCH_NAME:
      return action.payload;
    default:
      return state;
  }
}
