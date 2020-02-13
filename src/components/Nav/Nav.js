import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { LetterAvatar } from './Avatar';
import { LoginStatusIcon } from './LoginStatusIcon';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './styles.css';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

export const Nav = ({ user, setUser, signOut }) => {
	const classes = useStyles();
	const loggedUser = useSelector((state) => state.getUser);

	return (
		<AppBar position="static">
			<Toolbar>
				<Link to="/" className={'nav__link'}>
					<div className="flex items-center justify-center">
						<img
							className="mr-2"
							src="app_icon.png"
							alt="app icon"
							width="50px"
							height="50px"
						></img>
						<Typography id={'nav__logo'} variant="h5" className={classes.title}>
							DScore
						</Typography>
					</div>
				</Link>
				<div className={'nav__links'}>
					{loggedUser.user && loggedUser.user.id ? (
						<>
							<Link
								id={'nav__home-link'}
								className={'nav__link'}
								to="/current_game"
							>
								<span color="inherit">Current Game</span>
							</Link>
							<Link
								id={'nav__game-link'}
								className={'nav__link'}
								to="/new_game"
							>
								<span color="inherit">New Game</span>
							</Link>
						</>
					) : null}
					<Link
						id={'nav__leaderboard-link'}
						className={'nav__link'}
						to="/leaderboard"
					>
						<span color="inherit">Leaderboard</span>
					</Link>
					{loggedUser.user && loggedUser.user.id ? (
						// <span
						// 	id={'nav__signin-link'}
						// 	className={'nav__link'}
						// 	onClick={signOut}
						// >
						// 	<span color="inherit" style={{ cursor: 'pointer' }}>
						// 		Logout
						// 	</span>
						// </span>
						<LoginStatusIcon signOut={signOut}></LoginStatusIcon>
					) : (
						<Link
							id={'nav__signin-link'}
							className={'nav__link'}
							to="/registration"
						>
							<span color="inherit">Sign In / Sign Up</span>
						</Link>
					)}
				</div>
			</Toolbar>
		</AppBar>
	);
};
