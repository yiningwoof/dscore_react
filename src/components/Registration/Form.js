import React from "react";

export const SignUpForm = ({ errors, handleErrors, handleSubmit }) => (
  <div className="form-container sign-up-container">
    <form id={"sign-up__form"}>
      <h1>Create Account</h1>
      <input
        className="input"
        data-colname={"firstname"}
        type="firstname"
        placeholder="First name"
      />
      <input
        className="input"
        data-colname={"lastname"}
        type="lastname"
        placeholder="Last name"
      />
      <input
        className="input"
        data-colname={"email"}
        type="text"
        placeholder="Email"
      />
      <span className={"error__container"}>
        {/* {errors + " message goes here"} */}
      </span>
      <input
        className="input"
        data-colname={"password"}
        type="password"
        placeholder="Password"
      />
      <span className={"error__container"}>
        {/* {errors + " message goes here"} */}
      </span>
      <input
        className="input"
        data_colname={"password_confirmation"}
        type="password"
        placeholder="Confirm password"
      />
      <button
        onClick={e => {
          e.preventDefault();
          handleSubmit("sign-up__form");
        }}
      >
        Sign Up
      </button>
    </form>
  </div>
);

export const SignInForm = ({ errors, handleErrors, handleSubmit }) => (
  <div className="form-container sign-in-container">
    <form id={"sign-in__form"}>
      <h1>Sign in</h1>
      <input
        className="input"
        data-colname={"email"}
        type="name"
        placeholder="Email"
      />
      <input
        className="input"
        data-colname={"password"}
        type="password"
        placeholder="Password"
      />
      <button
        onClick={e => {
          e.preventDefault();
          handleSubmit("sign-in__form");
        }}
      >
        Sign In
      </button>
    </form>
  </div>
);
