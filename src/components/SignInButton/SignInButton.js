import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

export const SignInButton = () => {
	return (
		<div>
			<Link to="/registration">
				<Button variant="contained" color="primary">
					Sign in / Sign up
				</Button>
			</Link>
		</div>
	);
};
