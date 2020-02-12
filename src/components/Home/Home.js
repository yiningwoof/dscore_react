import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import MaterialUIForm from "react-material-ui-form";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
  getUser,
  getHoles,
  getGame,
  getRounds,
  postScores,
  getGameData,
  updateHoleScores
} from "../../actions";

import history from "../../history";

import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import mapStyles from "./mapStyles";

import axios from "axios";

export const Home = () => {
  const dispatch = useDispatch();

  const holes = useSelector(state => state.getHoles);
  const playerNames = useSelector(state => state.getPlayerNames);
  const game = useSelector(state => state.getGame);
  const rounds = useSelector(state => state.getRounds);
  const scores = useSelector(state => state.getScoresFromRes);
  const loggedUser = useSelector(state => state.getUser);
  const gameData = useSelector(state => state.getGameData);
  const holeScores = useSelector(state => state.updateHoleScores);

  const [isInitialRender, setIsInitialRender] = useState(true);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const startNewGame = () => {
    dispatch({ type: "INIT_GAME" });
    dispatch({ type: "INIT_ROUNDS" });
    dispatch({ type: "INIT_SCORES" });
    history.push("/new_game");
  };

  useEffect(() => {
    if (Object.keys(holeScores).length === 2) {
      handleClickOpen();
    }
  }, [holeScores]);

  const Map = () => {
    const [selectedHole, setSelectedHole] = useState(null);
    const [scoresState, setScoresState] = useState({});

    const createScores = selectedHole => {
      console.log(holeScores);
      if (!loggedUser.user) {
        history.push("/registration");
      } else if (Object.keys(rounds).length === 0) {
        history.push("/new_game");
      } else {
        dispatch({
          type: "UPDATE_HOLE_SCORES",
          payload: { [`${selectedHole.id}`]: scoresState }
        });
        dispatch(postScores(scoresState, selectedHole.id, rounds));
      }
    };

    return (
      <div>
        {/* {console.log(holeScores)} */}
        <GoogleMap
          defaultZoom={17}
          defaultCenter={{ lat: 30.42, lng: -97.643586 }}
          defaultOptions={{ styles: mapStyles }}
        >
          {holes.map(hole => (
            <Marker
              key={hole.id}
              position={{
                lat: parseFloat(hole.lat),
                lng: parseFloat(hole.lng)
              }}
              onClick={() => {
                setSelectedHole(hole);
              }}
              icon={
                Object.keys(holeScores).includes(hole.id + "")
                  ? {
                      url: "checkmark3.png",
                      scaledSize: new window.google.maps.Size(30, 30)
                    }
                  : {
                      url: `/${hole.id}.png`,
                      scaledSize: new window.google.maps.Size(30, 30)
                    }
              }
            ></Marker>
          ))}
          {selectedHole ? (
            <InfoWindow
              position={{
                lat: parseFloat(selectedHole.lat),
                lng: parseFloat(selectedHole.lng)
              }}
              onCloseClick={() => {
                setSelectedHole(null);
              }}
            >
              <div class="p-4">
                {/* <h3>{`Hole #${selectedHole.id}`}</h3> */}
                <Typography variant="h4" gutterBottom>
                  {`Hole #${selectedHole.id}`}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Par: {selectedHole.par}
                </Typography>
                <br />
                <img
                  className="rounded"
                  src={selectedHole.pic}
                  alt={selectedHole.id}
                  height="300px"
                  width="400px"
                ></img>
                <br />
                <hr className="mt-4 border-gray-400" />
                {Object.keys(holeScores).includes(selectedHole.id + "") ? (
                  <div class="flex flex-col items-center justify-center">
                    {Object.keys(holeScores[selectedHole.id]).map(name => (
                      <div>
                        <Typography variant="h6" gutterButtom>
                          {`${name}: ${holeScores[selectedHole.id][name]}`}
                        </Typography>
                      </div>
                    ))}
                  </div>
                ) : (
                  <MaterialUIForm onSubmit={() => createScores(selectedHole)}>
                    {rounds.map(round => (
                      <div>
                        <Typography variant="h6" gutterBottom>
                          {`${round.data.name}`}:
                        </Typography>
                        <TextField
                          required
                          id="standard-required"
                          label={"score"}
                          onChange={e => {
                            setScoresState({
                              ...scoresState,
                              [`${round.data.name}`]: e.target.value
                            });
                          }}
                        />
                      </div>
                    ))}
                    <br></br>
                    <Button variant="contained" color="primary" type="submit">
                      Log Score
                    </Button>
                  </MaterialUIForm>
                )}
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    );
  };

  const WrappedMap = withScriptjs(withGoogleMap(Map));
  // if (holes.length > 0) {

  return (
    <div className="flex-1">
      {holes.length > 0 ? (
        <>
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
          />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Good Job!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                The game is complete. Checkout your rank in Leaderboard now!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Link to="/leaderboard">
                <Button variant="contained" color="primary">
                  Leaderboard
                </Button>
              </Link>

              <Button
                variant="contained"
                color="secondary"
                onClick={startNewGame}
              >
                Create New Game
              </Button>

              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : null}
    </div>
  );
};
