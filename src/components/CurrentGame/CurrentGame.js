import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MaterialUIForm from 'react-material-ui-form';

// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getGame, getScores } from '../../actions';

import history from '../../history';

export const CurrentGame = () => {
	const dispatch = useDispatch();

	const game = useSelector((state) => state.getGame);
	const rounds = useSelector((state) => state.getRounds);
	const scores = useSelector((state) => state.getScores);
	const [isInitialRender, setIsInitialRender] = useState(true);

	useEffect(() => {
		if (isInitialRender) {
			dispatch(getScores(rounds));
			setIsInitialRender(false);
		}
		console.log(scores);
	}, [scores]);

	return (
		<div>
			{Object.keys(game).length === 0 ? (
				<Link to="/new_game">
					<Button variant="contained" color="primary">
						Create A Game
					</Button>
				</Link>
			) : (
				<>
					<h2>current game</h2>
					<p>This is another element</p>
				</>
			)}
		</div>
	);
};
