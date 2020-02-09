import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
// const dispatch = useDispatch();

export const signIn = () => {
  return {
    type: "SIGN_IN"
  };
};

export const signOut = () => dispatch => {
  axios
    .delete("http://localhost:3000/api/v1/logout", {
      withCredentials: true
    })
    .then(res => {
      dispatch({
        type: "SIGN_OUT"
      });
    })
    .catch(error => {
      console.log("logout error", error);
    });
};

export const getGameData = () => dispatch => {
  setTimeout(() => {
    axios
      .get("http://localhost:3000/api/v1/logged_in", {
        withCredentials: true
      })
      .then(res => {
        dispatch({
          type: "GET_GAME_DATA",
          payload: res
        });
      });
  }, 100);
};

export const getUser = () => (dispatch, getState) => {
  axios
    .get("http://localhost:3000/api/v1/logged_in", {
      withCredentials: true
    })
    .then(res => {
      dispatch(getGameData(res));
      if (res.data.logged_in) {
        dispatch(signIn());
        dispatch({
          type: "GET_USER",
          payload: res.data.user
        });
      }
      // } else if (!res.data.logged_in && user.id) {
      // 	setUser({});
    })
    .catch(error => {
      console.log(("error", error));
    });
  // Functional React components should return either JSX or React.createComponent()
};

export const getPlayerNames = playerNames => {
  return {
    type: "GET_PLAYERNAMES",
    payload: playerNames
  };
};

export const getHoles = () => dispatch => {
  axios.get("http://localhost:3000/api/v1/holes").then(res => {
    dispatch({
      type: "GET_HOLES",
      payload: res.data
    });
  });
};

export const postScore = () => dispatch => {
  axios.post("http://localhost:3000/api/v1/scores").then(res => {});
};

export const initializeRounds = () => {
  return {
    type: "INIT"
  };
};

export const postGame = (date, loggedUser, playerNamesState) => dispatch => {
  dispatch(initializeRounds());
  axios
    .post(
      "http://localhost:3000/api/v1/games",
      {
        date: date
      },
      { withCredentials: true }
    )
    .then(res => {
      dispatch({
        type: "CREATE_GAME",
        payload: {
          game_id: res.data.id,
          game_date: res.data.date
        }
      });
      return res;
    })
    .then(res => dispatch(postRounds(loggedUser, res, playerNamesState)));
};

export const postRounds = (
  loggedUser,
  resFromGame,
  playerNamesState
) => dispatch => {
  let data = {
    user_id: loggedUser.user.id,
    game_id: resFromGame.data.id,
    name: loggedUser.user.firstname
  };
  axios
    .post("http://localhost:3000/api/v1/rounds", data, {
      withCredentials: true
    })
    // .then(res => {
    //   dispatch(getRounds({ round_id: res.data.id, data: data }));
    // });
    .then(() => {
      Object.keys(playerNamesState).forEach(playerKey => {
        let data = {
          user_id: loggedUser.user.id,
          game_id: resFromGame.data.id,
          name: playerNamesState[playerKey]
        };
        axios.post("http://localhost:3000/api/v1/rounds", data, {
          withCredentials: true
        });
        //   .then(res => {
        //     dispatch(getRounds({ round_id: res.data.id, data: data }));
        //   });
      });
    });
};

export const getRounds = data => {
  return {
    type: "GET_ROUNDS",
    payload: data
  };
};

export const postScores = (scores, holeId, rounds) => dispatch => {
  //   console.log(scores, holeId, rounds);
  let allUsersScores = [];
  Object.keys(scores).forEach(name => {
    let userScore = {};
    userScore["hole_id"] = holeId;
    userScore["score"] = parseInt(scores[name]);
    let userRound = rounds.filter(round => round.data.name === name);
    userScore["round_id"] = userRound[0].round_id;
    allUsersScores.push(userScore);
  });
  allUsersScores.forEach(score => {
    axios.post(
      "http://localhost:3000/api/v1/scores",
      {
        score: score
      },
      { withCredentials: true }
    );
  });
};

export const getScores = rounds => dispatch => {
  let allUserScores = {};
  console.log(rounds);
  rounds.forEach(round => {
    axios
      .get("http://localhost:3000/api/v1/scores")
      .then(res => res.data)
      .then(allScores => {
        let filteredScore = allScores.filter(
          score => score.round_id === round.round_id
        );
        return filteredScore;
      })
      .then(console.log);
  });
};
