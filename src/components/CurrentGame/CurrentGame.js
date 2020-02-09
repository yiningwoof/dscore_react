import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MaterialUIForm from "react-material-ui-form";

// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser, getGame, getScores, getGameData } from "../../actions";

import history from "../../history";

export const CurrentGame = () => {
  const dispatch = useDispatch();

  const game = useSelector(state => state.getGame);
  const rounds = useSelector(state => state.getRounds);
  const scores = useSelector(state => state.getScores);

  const gameData = useSelector(state => state.getGameData);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (isInitialRender) {
      //   dispatch(getScores(rounds));
      dispatch(getGameData());
      setIsInitialRender(false);
    }
  }, [scores, gameData]);

  return (
    <div>
      {/* {console.log(gameData)} */}
      {gameData.data && gameData.data.game.id ? (
        <>
          <h2>current game</h2>
          <p>This is another element</p>
        </>
      ) : (
        <Link to="/new_game">
          <Button variant="contained" color="primary">
            Create A Game
          </Button>
        </Link>
      )}
    </div>
  );
};
