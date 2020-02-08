import React, { useEffect } from "react";
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
import { getGame } from "../../actions";

import history from "../../history";

export const CurrentGame = () => {
  const game = useSelector(state => state.getGame);

  useEffect(() => console.log(game), [game]);

  return (
    <div>
      {Object.keys(game).length === 0 ? (
        <Link to="/new_game">
          <Button variant="contained" color="primary">
            Create A Game
          </Button>
        </Link>
      ) : (
        <h2>current game</h2>
      )}
    </div>
  );
};
