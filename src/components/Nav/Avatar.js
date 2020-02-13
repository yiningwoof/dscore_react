import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getUser } from '../../actions';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {
	deepOrange,
	deepPurple,
	yellow,
	cyan,
	lightGreen
} from '@material-ui/core/colors';

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
	},
	yellow: {
		color: theme.palette.getContrastText(yellow[500]),
		backgroundColor: yellow[500]
	},
	cyan: {
		color: theme.palette.getContrastText(cyan[200]),
		backgroundColor: cyan[200]
	},
	lightGreen: {
		color: theme.palette.getContrastText(lightGreen[200]),
		backgroundColor: lightGreen[200]
	}
}));

export const LetterAvatar = () => {
	const loggedUser = useSelector((state) => state.getUser);
	const classes = useStyles();

	console.log(loggedUser.user);
	return (
		<div className={classes.root}>
			<Avatar className={classes.yellow}>
				{loggedUser.user.firstname[0].toUpperCase()}
			</Avatar>
		</div>
	);
};
