import React, { useEffect, useState } from "react";
import { SignUpForm, SignInForm } from "./Form";
import { SignInOverlay } from "./Overlay";
import { useDispatch } from "react-redux";
import { getUser, getHoles } from "../../actions";
import axios from "axios";
import "./styles.css";
// var cors = require("cors");
// App.use(cors()); // Use this after the variable declaration

export const Registration = setUser => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});

  const handleSubmit = async formId => {
    const signUpAPI = `http://localhost:3000/api/v1/users`;
    const signInAPI = "http://localhost:3000/api/v1/sessions";
    // const APIUrl = `/api/v1/users`;

    if (formId === "sign-up__form") {
      await handleSignUp(formId, setUser, signUpAPI);
    } else {
      await handleSignIn(formId, setUser, signInAPI);
    }
  };

  const handleSignUp = (form, setUserState, APIUrl) => {
    const formEl = document.querySelector(`#${form}`); //find form that user filled out
    const inputsArr = formEl.querySelectorAll("input"); // gets a list of all inputs on above form
    let userObject = {}; // initializing user obj

    inputsArr.forEach(input => {
      //loop through inputs
      userObject[input.dataset.colname] = input.value; // build user obj with input values
    });

    // const fetchOptions = {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   //   credentials: "include",
    //   body: JSON.stringify({ user: userObject })
    // };

    axios
      .post(
        APIUrl,
        {
          user: userObject
        },
        { withCredentials: true }
      )
      .then(res => (res.data.id ? dispatch(getUser()) : null));
  };

  const handleSignIn = (form, setUserState, APIUrl) => {
    const formEl = document.querySelector(`#${form}`); //find form that user filled out
    const inputsArr = formEl.querySelectorAll("input"); // gets a list of all inputs on above form
    let userObject = {}; // initializing user obj

    inputsArr.forEach(input => {
      //loop through inputs
      userObject[input.dataset.colname] = input.value; // build user obj with input values
    });

    axios
      .post(APIUrl, { user: userObject }, { withCredentials: true })
      //   .then(res => setUserState(res.data.user))
      //   .then(console.log)
      .then(res => {
        console.log(res);
        if (res.data.logged_in) {
          dispatch(getUser());
        }
      })
      .catch(error => {
        if (error.response.status === 404) {
          setError({
            status: 404,
            msg: "User account does not exist. Please sign up first."
          });
        }
        if (error.response.status === 401) {
          setError({
            status: 401,
            msg: "Incorrect password. Please try again."
          });
        }
      });
  };
  return (
    <div>
      <div className="container" id="container">
        <SignUpForm error={error} handleSubmit={handleSubmit} />
        <SignInForm error={error} handleSubmit={handleSubmit} />
        <SignInOverlay />
      </div>
    </div>
  );
};
