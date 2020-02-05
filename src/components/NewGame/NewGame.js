import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MaterialUIFOrm from 'react-material-ui-form';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
		// width: 200
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	},
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: 200
		}
	}
}));

export const NewGame = () => {
	const classes = useStyles();
	const [numberPlayers, setNumberPlayers] = React.useState('');
	const [playerNames, setPlayerNames] = React.useState([]);

	const inputLabel = React.useRef(null);
	const [labelWidth, setLabelWidth] = React.useState(0);
	// React.useEffect(() => {
	// 	setLabelWidth(inputLabel.current.offsetWidth);
	// }, []);

	const handleChange = (event) => {
		setNumberPlayers(event.target.value);
	};

	const handleCreateGame = (event) => {
		console.log(event.target.value);
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
			{numberPlayers === '' ? null : (
				<div>
					<h2>Let's get player names!</h2>
					<form className={classes.root} noValidate autoComplete="off">
						{[...Array(numberPlayers)].map((player, index) => (
							<TextField
								required
								id="standard-required"
								label={`player ${index + 1}`}
								// defaultValue="Hello World"
							/>
							// <TextField id="standard-basic" label={`player ${index + 1}`} />
						))}
						{/* {[0, 1, 2].map((n) => (
							<TextField id="standard-basic" label={`player ${n + 1}`} />
						))} */}
						<Button
							variant="contained"
							color="primary"
							handleSubmit={handleCreateGame}
						>
							Create Game
						</Button>
					</form>
				</div>
			)}
		</div>
	);
};
