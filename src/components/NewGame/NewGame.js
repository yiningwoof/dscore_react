import React from "react";
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
import { getUser, getPlayerNames } from "../../actions";

import history from "../../history";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
    // width: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

export const NewGame = props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [numberPlayers, setNumberPlayers] = React.useState("");
  const [playerNamesState, setPlayerNamesState] = React.useState({});

  const playerNames = useSelector(state => state.getPlayerNames);

  const [labelWidth, setLabelWidth] = React.useState(0);

  // React.useEffect(() => {
  // 	setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  const handleChange = event => {
    setNumberPlayers(event.target.value);
  };

  const handleCreateGame = event => {
    // event.preventDefault();
    // event.persist();
    // console.log(textFieldRef);
    // console.log(event);
    // console.log(playerNamesState);
    dispatch(getPlayerNames(playerNamesState));
    dispatch(getUser());
    history.push("/" /*, pass state here */);
  };

  return (
    <div>
      {/* <form>
				<h1>Create a new game</h1>
				<label>How Many Players?</label>
				<input className="input" type="text" placeholder="how many players?" />
				<Button variant="contained" color="primary">
					Create Game
				</Button>
			</form> */}
      <h1>Create a new game</h1>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">
          How Many Players
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={numberPlayers}
          onChange={handleChange}
        >
          <MenuItem value={0}>None - Just me!</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
        </Select>
        <FormHelperText>
          enter number of friends playing with you today
        </FormHelperText>
      </FormControl>
      {numberPlayers === "" ? null : (
        <div>
          <h2>Let's get player names!</h2>
          <MaterialUIForm onSubmit={handleCreateGame}>
            {/* <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleCreateGame}
          > */}
            {[...Array(numberPlayers)].map((player, index) => (
              <TextField
                required
                id="standard-required"
                // ref={textFieldRef}
                label={`player ${index + 1}`}
                onChange={e => {
                  setPlayerNamesState({
                    ...playerNamesState,
                    [`player${index + 1}`]: e.target.value
                  });
                }}
              />
            ))}
            <br />
            <Button variant="contained" color="primary" type="submit">
              Create Game
            </Button>
            {/* <Link component="button" variant="body2" href="/">
							Create Game
						</Link> */}
          </MaterialUIForm>
        </div>
      )}
    </div>
  );
};
