import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import MaterialUIForm from 'react-material-ui-form';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import history from '../../history';

export const CreateGameModal = ({ open, setOpen }) => {
	const dispatch = useDispatch();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const startNewGame = () => {
		handleClose();
		dispatch({ type: 'INIT_GAME' });
		dispatch({ type: 'INIT_ROUNDS' });
		dispatch({ type: 'INIT_SCORES' });
		history.push('/new_game');
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Warning'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						You don't have any game yet. Create one first!
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Link to="new_game">
						<Button onClick={handleClose} variant="contained" color="primary">
							Create New Game
						</Button>
					</Link>
					<Link to="/">
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
					</Link>
				</DialogActions>
			</Dialog>
			;
		</div>
	);
};
