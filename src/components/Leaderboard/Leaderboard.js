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
  getScoresFromRes,
  getAllRounds,
  getAllScores
} from "../../actions";

import history from "../../history";

const columns = [...Array(18)].map((i, index) => ({
  id: `${index + 1}`,
  label: `Hole #${index + 1}`,
  minWidth: 40,
  align: "center"
}));
columns.push({ id: "total", label: "Total", minWidth: 40, align: "center" });
columns.unshift({ id: "name", label: "Name", minWidth: 40, align: "center" });
console.log(columns);

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    height: "85vh"
  }
});

export const Leaderboard = () => {
  const dispatch = useDispatch();

  const rounds = useSelector(state => state.getRounds);
  const allRounds = useSelector(state => state.getAllRounds);
  const scores = useSelector(state => state.getScoresFromRes);
  const allScores = useSelector(state => state.getAllScores);

  const [isInitialRender, setIsInitialRender] = useState(true);

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    // dispatch(getAllRounds());
    dispatch(getAllScores());
    // setUpRows();
  }, []);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //   const roundIds = {};
  //   if (allRounds[0]) {
  //     console.log(allRounds);
  //     allRounds[0].forEach(round => {
  //       //   console.log(allRounds[0]);
  //       //   console.log(round.name, round.id);
  //       if (roundIds[`${round.name}`]) {
  //         roundIds[`${round.name}`].push(round.id);
  //       } else {
  //         roundIds[`${round.name}`] = [];
  //       }
  //     });
  //   }

  //   const scoreData = {};
  //   Object.keys(roundIds).forEach(name => {
  //     let targetScores = allScores.filter(
  //       score => score.round_id === roundIds[name]
  //     );
  //     scoreData[name] = targetScores;
  //   });

  //   const setUpRows = () => {
  //     const rowData = Object.keys(scoreData).map(name => {
  //       let data = {};
  //       data["Name"] = name;
  //       data["Total"] = 0;
  //       let holeNumbers = [...Array(18)].map((number, index) => index + 1);
  //       holeNumbers.forEach(number => {
  //         let total = 0;
  //         let targetScore = scoreData[name].filter(
  //           score => score.hole_id == number
  //         );
  //         if (targetScore.length > 0) {
  //           data[`Hole #${number}`] = targetScore[0].score;
  //           data["total"] += parseInt(targetScore[0].score);
  //         } else {
  //           data[`Hole #${number}`] = null;
  //         }
  //       });
  //       return data;
  //     });
  //     // console.log(rowData);
  //     setRows(rowData);
  //   };

  return (
    <div>
      {console.log(allScores)}
      <>
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
                {allScores
                  .sort((a, b) => a.total - b.total)
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
            count={allScores.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </>
    </div>
  );
};
