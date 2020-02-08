import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialUIForm from "react-material-ui-form";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import {
  getUser,
  getHoles,
  getGame,
  getRounds,
  postScores
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
  const loggedUser = useSelector(state => state.getUser);

  // useEffect(() => dispatch(getRoundIds(playerNames)));
  useEffect(() => {}, [game, rounds]);

  // console.log(holes);
  const Map = () => {
    const [selectedHole, setSelectedHole] = useState(null);
    const [scoresState, setScoresState] = useState({});
    // const loggedUser = useSelector(state => state.getUser);

    const createScores = selectedHole => {
      if (Object.keys(playerNames).length === 0) {
        history.push("/new_game");
      } else {
        // console.log(scoresState);
        // console.log(selectedHole);
        // console.log(rounds);
        dispatch(postScores(scoresState, selectedHole.id, rounds));

        // dispatch(postScore());
      }
    };

    return (
      <div>
        <GoogleMap
          defaultZoom={17}
          defaultCenter={{ lat: 30.419727, lng: -97.643586 }}
          defaultOptions={{ styles: mapStyles }}
        >
          {holes.map(hole =>
            hole.map(holeData => {
              return (
                <Marker
                  key={holeData.id}
                  position={{
                    lat: parseFloat(`${holeData.lat}`),
                    lng: parseFloat(`${holeData.lng}`)
                  }}
                  onClick={() => {
                    setSelectedHole(holeData);
                  }}
                  icon={{
                    url: `/${holeData.id}.png`,
                    scaledSize: new window.google.maps.Size(30, 30)
                  }}
                ></Marker>
              );
            })
          )}
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
              <div>
                <h3>{`Hole #${selectedHole.id}`}</h3>
                <img
                  src={selectedHole.pic}
                  alt={selectedHole.id}
                  height="300px"
                  width="400px"
                ></img>
                <h3>par: {selectedHole.par}</h3>
                <MaterialUIForm onSubmit={() => createScores(selectedHole)}>
                  {rounds.map((round, index) => (
                    <div>
                      <span>{`${round.data.name}`}</span>
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
              </div>
            </InfoWindow>
          ) : null}
          )
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
