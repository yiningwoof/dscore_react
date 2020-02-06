import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "./styles.css";

const useStyles = makeStyles(theme => ({
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

export const Nav = ({ user, setUser, logout }) => {
  const classes = useStyles();
  //   const dispatch = useDispatch();
  // const [loggedIn, setLoggedIn] = useState(false);
  // useEffect(() => {
  // 	if (user.id) {
  // 		setLoggedIn(true);
  // 	} else {
  // 		setLoggedIn(false);
  // 	}
  // });
  //   const isLogged = useSelector(state => state.isLogged);
  const loggedUser = useSelector(state => state.getUser);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Link to="/" className={"nav__link"}>
            <Typography id={"nav__logo"} variant="h5" className={classes.title}>
              Dscore
            </Typography>
          </Link>
          <div className={"nav__links"}>
            <Link id={"nav__home-link"} className={"nav__link"} to="/">
              <span color="inherit">Home</span>
            </Link>
            <Link id={"nav__game-link"} className={"nav__link"} to="/new_game">
              <span color="inherit">New Game</span>
            </Link>
            <Link
              id={"nav__leaderboard-link"}
              className={"nav__link"}
              to="/leaderboard"
            >
              <span color="inherit">Leaderboard</span>
            </Link>
            {loggedUser.user && loggedUser.user.id ? (
              <span
                id={"nav__signin-link"}
                className={"nav__link"}
                onClick={logout}
              >
                <span color="inherit" style={{ cursor: "pointer" }}>
                  Logout
                </span>
              </span>
            ) : (
              <Link
                id={"nav__signin-link"}
                className={"nav__link"}
                to="/registration"
              >
                <span color="inherit">Sign In / Sign Up</span>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
