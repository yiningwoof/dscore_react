import React, { Component } from "react";
import { SignUpForm, SignInForm } from "./Form";
import { SignInOverlay } from "./Overlay";
// import { handleUserFormSubmit } from '../../helpers';
import "./styles.css";

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
    const APIUrl = `http://localhost:3000/api/v1/users`;

    if (formId === "sign-up__form") {
      await this.handleUserFormSubmit(formId, setUser, APIUrl);
    } else {
      await this.handleUserFormSubmit(formId, setUser, `${APIUrl}/login`);
    }
  };

  handleUserFormSubmit = async (form, setUserState, APIUrl) => {
    const formEl = document.querySelector(`#${form}`); //find form that user filled out
    const inputsArr = formEl.querySelectorAll("input"); // gets a list of all inputs on above form
    let userObject = {}; // initializing user obj

    inputsArr.forEach(input => {
      //loop through inputs
      userObject[input.dataset.colname] = input.value; // build user obj with input values
    });

    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: userObject }, { withCredentials: true })
    };

    await fetch(APIUrl, fetchOptions) // make fetch post request that waits for api res
      .then(res => {
        //then when res comes back check res status for code
        if (res.status === 409) {
          // conflict res'

          res
            .text()
            .then(errs => {
              throw new Error(errs);
            })
            .catch(err => {
              const errJSON = JSON.parse(err.message);
              return errJSON;
            });
        } else if (res.status === 403) {
          // unauthorized res

          res
            .text()
            .then(errs => {
              throw new Error(errs);
            })
            .catch(err => {
              const errJSON = JSON.parse(err.message);
              return errJSON;
            });
        } else {
          res.json().then(user => {
            setUserState(user); // references the setUser hook in signIn.js
          });
        }
      });
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
