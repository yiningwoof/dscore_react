import React, { Component } from "react";
import { SignUpForm, SignInForm } from "./Form";
import { SignInOverlay } from "./Overlay";
// import { handleUserFormSubmit } from '../../helpers';
import axios from "axios";
import "./styles.css";
// var cors = require("cors");
// App.use(cors()); // Use this after the variable declaration

export class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: ["error state"]
    };
  }

  handleErrors = errObj => {
    const newErrObj = Object.keys(errObj.message).map(key => {
      return {
        key,
        message: errObj.message[key][0]
      };
    });

    this.setState({
      ...this.state,
      errors: [...this.state.errors, ...newErrObj]
    });
  };

  handleSubmit = async formId => {
    const { setUser } = this.props; // references the setUser hook in App.js
    const signUpAPI = `http://localhost:3000/api/v1/users`;
    const signInAPI = "http://localhost:3000/api/v1/sessions";
    // const APIUrl = `/api/v1/users`;

    if (formId === "sign-up__form") {
      await this.handleSignUp(formId, setUser, signUpAPI);
    } else {
      await this.handleSignIn(formId, setUser, signInAPI);
    }
  };

  handleSignUp = async (form, setUserState, APIUrl) => {
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
      .then(res => setUserState(res.data));
    //   .then(user => setUserState(user)).then(() => {

    //   });
    //   .then(user => setUserState(user));

    // await fetch(APIUrl, fetchOptions) // make fetch post request that waits for api res
    //   .then(res => {
    //     console.log(res);
    //     //then when res comes back check res status for code
    //     if (res.status === 409) {
    //       // conflict res'

    //       res
    //         .text()
    //         .then(errs => {
    //           //   console.log(res);
    //           throw new Error(errs);
    //         })
    //         .catch(err => {
    //           const errJSON = JSON.parse(err.message);
    //           return errJSON;
    //         });
    //     } else if (res.status === 403) {
    //       // unauthorized res

    //       res
    //         .text()
    //         .then(errs => {
    //           //   console.log(res);
    //           throw new Error(errs);
    //         })
    //         .catch(err => {
    //           const errJSON = JSON.parse(err.message);
    //           return errJSON;
    //         });
    //     } else {
    //       res.json().then(user => {
    //         // console.log(user);
    //         setUserState(user); // references the setUser hook in signIn.js
    //       });
    //     }
    //   });
  };

  handleSignIn = async (form, setUserState, APIUrl) => {
    const formEl = document.querySelector(`#${form}`); //find form that user filled out
    const inputsArr = formEl.querySelectorAll("input"); // gets a list of all inputs on above form
    let userObject = {}; // initializing user obj

    inputsArr.forEach(input => {
      //loop through inputs
      userObject[input.dataset.colname] = input.value; // build user obj with input values
    });

    axios
      .post(APIUrl, { user: userObject }, { withCredentials: true })
      .then(res => setUserState(res.data));
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="container" id="container">
          <SignUpForm
            errors={errors}
            handleErrors={this.handleErrors}
            handleSubmit={this.handleSubmit}
          />
          <SignInForm
            errors={errors}
            handleErrors={this.handleErrors}
            handleSubmit={this.handleSubmit}
          />
          <SignInOverlay />
        </div>
      </div>
    );
  }
}
