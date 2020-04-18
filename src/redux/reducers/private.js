import {handleActions} from "redux-actions";
import {actionCreators} from "../actionCreators";

const initialState = {
  clientID: null,
  currentTurn: false
};

export default handleActions(
  {
    [actionCreators.private.saveClientID]: (state, action) => ({
      ...state,
      clientID: action.payload.clientID
    })
  },
  initialState
);
