import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  getGame,
  getScores,
  getGameData,
  getScoresFromRes
} from "../../actions";

import history from "../../history";

const columns = [...Array(18)].map((i, index) => ({
  id: `Hole #${index + 1}`,
  label: `Hole #${index + 1}`,
  minWidth: 40,
  align: "center"
}));
columns.push({ id: "Total", label: "Total", minWidth: 40, align: "center" });
columns.unshift({ id: "Name", label: "Name", minWidth: 40, align: "center" });

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  }
});

export const CurrentGame = () => {
  const dispatch = useDispatch();

  const game = useSelector(state => state.getGame);
  const rounds = useSelector(state => state.getRounds);
  const scores = useSelector(state => state.getScoresFromRes);

  const gameData = useSelector(state => state.getGameData);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    if (isInitialRender) {
      // dispatch(getScores(rounds));
      // dispatch(getGameData());
      setIsInitialRender(false);
    }
    setUpRows();
  }, []);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const roundIds = {};
  rounds.forEach(round => {
    roundIds[`${round.data.name}`] = round.round_id;
  });

  const scoreData = {};
  Object.keys(roundIds).forEach(name => {
    let targetScores = scores.filter(
      score => score.round_id === roundIds[name]
    );
    scoreData[name] = targetScores;
  });

  const setUpRows = () => {
    const rowData = Object.keys(scoreData).map(name => {
      let data = {};
      data["name"] = name;
      data["total"] = 0;
      let holeNumbers = [...Array(18)].map((number, index) => index + 1);
      holeNumbers.forEach(number => {
        let total = 0;
        let targetScore = scoreData[name].filter(
          score => score.hole_id == number
        );
        if (targetScore.length > 0) {
          data[`Hole #${number}`] = targetScore[0].score;
          data["total"] += parseInt(targetScore[0].score);
        } else {
          data[`Hole #${number}`] = null;
        }
      });
      return data;
    });
    setRows(rowData);
  };
  console.log(rows);

  console.log("from current game scores: ", scores);
  console.log("rounds", rounds);

  // let all allScores = scores.map(score => {
  //   let scoresData = {};
  //   scoresData['name'] = score.name;
  //   let holeNumbers = [...Array(18)].map((number, index) => index + 1);
  //   holeNumbers.forEach(number => {

  //   })
  // })

  //   let names = Object.keys(scores);
  //   let allScores = names.map(name => {
  //     let scoresData = {};
  //     scoresData["name"] = name;
  //     let holeNumbers = [...Array(18)].map((number, index) => index + 1);
  //     holeNumbers.forEach(number => {
  //       let targetScore = scores[name].filter(score => score.hole_id == number);
  //       console.log(targetScore);
  //       if (targetScore.length > 0) {
  //         scoresData[`Hole #${number}`] = targetScore[0].score;
  //       } else {
  //         scoresData[`Hole #${number}`] = null;
  //       }
  //     });
  //     return scoresData;
  //   });
  //   console.log(allScores);
  // }

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
      {/* {console.log(scores)} */}
      {rounds.length !== 0 ? (
        <>
          <h2>current game</h2>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
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
                    .map(row => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {/* <TableCell>{index + 1}</TableCell> */}
                          {columns.map(column => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
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
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
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
