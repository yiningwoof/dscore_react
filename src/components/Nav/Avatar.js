import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getUser } from '../../actions';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'inline-block',
		'& > *': {
			margin: theme.spacing(1)
		}
	},
	orange: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500]
	},
	purple: {
		color: theme.palette.getContrastText(deepPurple[500]),
		backgroundColor: deepPurple[500]
	}
}));

export const LetterAvatar = () => {
	const loggedUser = useSelector((state) => state.getUser);
	const classes = useStyles();

	console.log(loggedUser.user);
	return (
		<div className={classes.root}>
			<Avatar className={classes.purple}>
				{loggedUser.user.firstname[0].toUpperCase()}
			</Avatar>
		</div>
	);
};
