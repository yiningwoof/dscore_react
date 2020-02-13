import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MaterialUIForm from 'react-material-ui-form';

import { ConfirmModal } from './ConfirmModal';
// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getUser, getPlayerNames, postGame } from '../../actions';

import history from '../../history';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 280
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

export const NewGame = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [open, setOpen] = React.useState(false);

	const [numberPlayers, setNumberPlayers] = React.useState('');
	const [playerNamesState, setPlayerNamesState] = React.useState({});

	const playerNames = useSelector((state) => state.getPlayerNames);
	const loggedUser = useSelector((state) => state.getUser);
	const game = useSelector((state) => state.getGame);
	const holeScores = useSelector((state) => state.updateHoleScores);

	const [labelWidth, setLabelWidth] = React.useState(0);

	React.useEffect(() => {
		console.log('hole scores', holeScores);
		if (game.game_id && Object.keys(holeScores).length !== 18) {
			setOpen(true);
		}
	}, []);

	const handleChange = (event) => {
		setNumberPlayers(event.target.value);
	};

	const handleCreateGame = (event) => {
		let date = new Date();
		dispatch(getPlayerNames(playerNamesState));
		dispatch(postGame(date, loggedUser, playerNamesState));
		history.push('/' /*, pass state here */);
	};

	return (
		<div className="flex w-full">
			<div className="w-1/2 p-4 flex flex-col justify-start items-center">
				<h2>Create a new game...</h2>
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
			</div>
			<div className="w-1/2 p-4 flex flex-col justify-start items-center">
				{numberPlayers === '' ? null : (
					<div>
						{numberPlayers === 0 ? (
							<>
								<br></br>
								<br></br>
							</>
						) : (
							<h2>Let's get player names...</h2>
						)}
						<MaterialUIForm onSubmit={handleCreateGame}>
							{[...Array(numberPlayers)].map((player, index) => (
								<TextField
									required
									key={index}
									id="standard-required"
									// ref={textFieldRef}
									label={`player ${index + 1}`}
									onChange={(e) => {
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
						</MaterialUIForm>
					</div>
				)}
			</div>
			<ConfirmModal open={open} setOpen={setOpen}></ConfirmModal>
		</div>
	);
};
