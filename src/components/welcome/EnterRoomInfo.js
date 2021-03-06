/** @jsx jsx */
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {jsx} from "@emotion/core";
import {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";
import {IconButton} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

/**
 * Step 2 in the Welcome Modal.
 * Enter game code and player name.
 **/
export default function EnterRoomInfo({socket, setStep}) {
  const dispatch = useDispatch();

  const [playerName, setPlayerName] = useState(null);
  const [roomID, setRoomID] = useState(null);
  const [joinError, setJoinError] = useState(null);
  const [nameError, setNameError] = useState(null);

  // Subscribe to socket events when the component mounts
  useEffect(() => {
    socket.on("joinFailure", error => {
      setJoinError(error);
    });

    socket.on("nameFailure", error => {
      setNameError(error);
    });

    socket.on("joinSuccess", (publicState) => {
      dispatch(actionCreators.public.updatePublicState(publicState));
      socket.emit("publicStateChange", publicState, publicState.roomID);
      setStep(3);
    });
  }, []);

  // Add Player to state and client to socket room
  const joinGame = () => {
    socket.emit('joinRoom', roomID, playerName);
  };

  const onChange = (event) => {
    const name = event.target.value;
    const lowerName = name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();

    setPlayerName(lowerName);

    if (event.target.value.length > 6){
      setNameError("Must be less than 7 characters")
    }
    else {
      setNameError(null)
    }

  };

  return (
    <div
      id="enter-room-info"
    >
      <DialogContentText
        css={{justifyContent: "center", alignItems: "center", display: "grid"}}
      >
        Enter Player Name for Room: {roomID}
      </DialogContentText>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid>
          <IconButton
            onClick={() => setStep(0)}>
            <ArrowBackIosIcon />
          </IconButton>
        </Grid>
        <Grid>
          <TextField
            error={joinError ? true : false}
            margin="dense"
            id="room-code"
            label="Room Code"
            type="text"
            onChange={event => setRoomID(event.target.value)}
            helperText={joinError ? joinError: null}
            val={roomID}
          />
        </Grid>
        <Grid>
          <TextField
            error={nameError ? true : false}
            margin="dense"
            id="player-name"
            label="Player Name"
            type="text"
            onChange={event => onChange(event)}
            helperText={nameError ? nameError: null}
            val={nameError}
          />
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={() => joinGame()}
            disabled={!playerName || !roomID}
          >
            Join Game
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}