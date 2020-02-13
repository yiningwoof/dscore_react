import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

export const Welcome = () => {
	const [state, setState] = React.useState({
		open: false,
		vertical: 'top',
		horizontal: 'center'
	});

	const { vertical, horizontal, open } = state;

	const handleClick = (newState) => () => {
		setState({ open: true, ...newState });
	};

	const handleClose = () => {
		setState({ ...state, open: false });
	};

	return (
		<div>
			<Button onClick={handleClick({ vertical: 'top', horizontal: 'right' })}>
				Top-Right
			</Button>
			<Snackbar
				anchorOrigin={{ vertical, horizontal }}
				key={`${vertical},${horizontal}`}
				open={open}
				onClose={handleClose}
				message="I love snacks"
			/>
		</div>
	);
};
