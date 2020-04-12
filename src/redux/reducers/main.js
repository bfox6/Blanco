import { handleActions } from "redux-actions";
import {actionCreators} from "../actionCreators";
import getRandomInteger from "../../utils/getRandomInteger";
import createPlayerObject from "../utils/createPlayerObject";

const initialState = {
  roomID: null,
  roomName: null,
  numberOfPlayers: null,
  players: null
};

export default handleActions(
  {
    [actionCreators.createGame]: (state, action) => ({
      ...state,
      roomID: getRandomInteger(1000, 9000),
      roomName: action.payload.roomName,
      numberOfPlayers: action.payload.numberOfPlayers,
      players: createPlayerObject(action.payload.numberOfPlayers)
    }),
    [actionCreators.addPlayer]: (state, action) => ({
      ...state,
      players: {
        ...state.players,
        [action.payload.playerNumber]: {
          playerName: action.payload.playerName,
          score: 0
        }
      }
    }),
    [actionCreators.updateEntireState]: (state, action) => {
      console.log(state);
      console.log(action.payload.newState);
      return action.payload.newState
    }
  },
  initialState
);