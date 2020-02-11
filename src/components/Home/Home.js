import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialUIForm from "react-material-ui-form";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import {
  getUser,
  getHoles,
  getGame,
  getRounds,
  postScores,
  getGameData
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
  // const [holeStates, setHoleStates] = useState({});
  const dispatch = useDispatch();
  // useEffect(() => {
  // 	dispatch(getHoles());
  // }, []);

  const holes = useSelector(state => state.getHoles);
  const playerNames = useSelector(state => state.getPlayerNames);
  const game = useSelector(state => state.getGame);
  const rounds = useSelector(state => state.getRounds);
  const scores = useSelector(state => state.getScoresFromRes);
  const loggedUser = useSelector(state => state.getUser);
  const gameData = useSelector(state => state.getGameData);
  const holeScores = useSelector(state => state.updateHoleScores);

  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (isInitialRender) {
      //   dispatch(getScores(rounds));
      dispatch(getGameData());
      setIsInitialRender(false);
    }
  }, []);

  //   console.log("from home hole scores: ", holeScores);

  // console.log(holes);
  const Map = () => {
    const [selectedHole, setSelectedHole] = useState(null);
    const [scoresState, setScoresState] = useState({});

    // let scores = gameData.data.scores;
    // let rounds = gameData.data.rounds;

    const createScores = selectedHole => {
      if (Object.keys(playerNames).length === 0) {
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
        {/* {console.log(
          scores
            .map(score => score.score)
            .filter((v, i, a) => a.indexOf(v) === i)
            .includes(holeData.id)
        )} */}
        {/* {console.log(scores.map(score => score.hole_id).uniq())} */}
        <GoogleMap
          defaultZoom={17}
          defaultCenter={{ lat: 30.419727, lng: -97.643586 }}
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
                scores.filter(score => score.hole_id == hole.id).length > 0
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
    <div>
      {holes.length > 0 ? (
        <div style={{ width: "100vw", height: "80vh" }}>
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
          />
        </div>
      ) : null}
    </div>
  );
};
