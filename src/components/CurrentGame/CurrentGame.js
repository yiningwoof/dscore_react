import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getUser, getGame, getScores, getGameData } from '../../actions';

import history from '../../history';

export const CurrentGame = () => {
	const dispatch = useDispatch();

	const useStyles = makeStyles({
		root: {
			width: '100%'
		},
		container: {
			maxHeight: 440
		}
	});

	const game = useSelector((state) => state.getGame);
	const rounds = useSelector((state) => state.getRounds);
	const scores = useSelector((state) => state.getScores);

	const gameData = useSelector((state) => state.getGameData);
	const [isInitialRender, setIsInitialRender] = useState(true);

	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [rows, setRows] = React.useState([]);

	useEffect(() => {
		if (isInitialRender) {
			//   dispatch(getScores(rounds));
			// dispatch(getGameData());
			// setIsInitialRender(false);
		}
		setRows(rounds);
		dispatch(getScores(rounds));
	}, [gameData]);

	const columns = [...Array(18)].map((i, index) => ({
		id: `Hole #${index + 1}`,
		label: `Hole #${index + 1}`,
		minWidth: 40,
		align: 'center'
	}));
	columns.push({ id: 'total', label: 'total', minWidth: 40, align: 'center' });
	columns.unshift({ id: 'name', label: 'name', minWidth: 40, align: 'center' });

	// console.log(columns);
	// const columns = [
	// 	{
	// 		id: 'rank',
	// 		label: 'Rank',
	// 		minWidth: 170,
	// 		align: 'center',
	// 		format: (value) => value.toLocaleString()
	// 	},
	// 	{
	// 		id: 'username',
	// 		label: 'Username',
	// 		minWidth: 100,
	// 		align: 'center',
	// 		format: (value) => value.toLocaleString()
	// 	},
	// 	{
	// 		id: 'clicks',
	// 		label: 'Clicks',
	// 		minWidth: 170,
	// 		align: 'center',
	// 		format: (value) => value.toLocaleString()
	// 	},
	// 	{
	// 		id: 'time',
	// 		label: 'Time (seconds)',
	// 		minWidth: 170,
	// 		align: 'center',
	// 		format: (value) => value.toLocaleString()
	// 	},
	// 	{
	// 		id: 'score',
	// 		label: 'Score',
	// 		minWidth: 170,
	// 		align: 'center',
	// 		format: (value) => value.toFixed(0)
	// 	}
	// ];

	return (
		<div>
			{console.log(scores)}
			{rounds.length !== 0 ? (
				<>
					<h2>current game</h2>
					<Paper className={classes.root}>
						<TableContainer className={classes.container}>
							<Table stickyHeader aria-label="sticky table">
								<TableHead>
									<TableRow>
										{columns.map((column) => (
											<TableCell
												key={column.id}
												align={column.align}
												style={{ minWidth: column.minWidth }}
											>
												{column.label}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{rows
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row) => {
											return (
												<TableRow
													hover
													role="checkbox"
													tabIndex={-1}
													key={row.code}
												>
													{/* <TableCell>{index + 1}</TableCell> */}
													{columns.map((column) => {
														const value = row[column.id];
														return (
															<TableCell key={column.id} align={column.align}>
																{column.format && typeof value === 'number'
																	? column.format(value)
																	: value}
															</TableCell>
														);
													})}
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
						// rowsPerPageOptions={[5, 10, 25, 100]}
						// component="div"
						// count={rows.length}
						// rowsPerPage={rowsPerPage}
						// page={page}
						// onChangePage={handleChangePage}
						// onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
					</Paper>
				</>
			) : (
				<Link to="/new_game">
					<Button variant="contained" color="primary">
						Create A Game
					</Button>
				</Link>
			)}
		</div>
	);
};
