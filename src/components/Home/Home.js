import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getHoles } from "../../actions";

import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import mapStyles from "./mapStyles";

export const Home = () => {
  const dispatch = useDispatch();
  const holes = useSelector(state => state.getHoles);
  const [holeStates, setHoleStates] = useState({});
  console.log(holes);

  useEffect(() => {
    dispatch(getHoles());
    setHoleStates(holes);
  }, []);

  function Map() {
    const [selectedHole, setSelectedHole] = useState(null);
    // const loggedUser = useSelector(state => state.getUser);
    console.log(holes);
    return (
      <div>
        <GoogleMap
          defaultZoom={17}
          defaultCenter={{ lat: 30.419727, lng: -97.643586 }}
          defaultOptions={{ styles: mapStyles }}
        >
          <Marker
            key={Math.random()}
            position={{ lat: 30.419082, lng: -97.64282 }}
            onClick={() => {
              setSelectedHole(1);
            }}
            icon={{
              url: "/1.png",
              scaledSize: new window.google.maps.Size(30, 30)
            }}
          ></Marker>
          <Marker
            key={1}
            position={{ lat: 30.418616, lng: -97.643808 }}
            onClick={() => {
              setSelectedHole(1);
            }}
            icon={{
              url: "/15.png",
              scaledSize: new window.google.maps.Size(30, 30)
            }}
          ></Marker>
          {selectedHole && (
            <InfoWindow
              position={{ lat: 30.419082, lng: -97.64282 }}
              onCloseClick={() => {
                setSelectedHole(null);
              }}
            >
              <div>hole details</div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    );
  }

  const WrappedMap = withScriptjs(withGoogleMap(Map));

  return (
    <div style={{ width: "100vw", height: "80vh" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
};
