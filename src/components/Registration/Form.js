import React from 'react';
import Button from '@material-ui/core/Button';

export const SignUpForm = ({ errorMsg, handleErrors, handleSubmit }) => (
	<div className="form-container sign-up-container">
		<form id={'sign-up__form'}>
			<h1>Create Account</h1>
			<input
				className="input"
				data-colname={'firstname'}
				type="text"
				placeholder="First name"
			/>
			<input
				className="input"
				data-colname={'lastname'}
				type="text"
				placeholder="Last name"
			/>
			<input
				className="input"
				data-colname={'email'}
				type="text"
				placeholder="Email"
			/>
			<span className={'error__container'}>
				{/* {errors + " message goes here"} */}
			</span>
			<input
				className="input"
				data-colname={'password'}
				type="password"
				placeholder="Password"
			/>
			<span className={'error__container'}>
				{/* {errors + " message goes here"} */}
			</span>
			<input
				className="input"
				data-colname={'password_confirmation'}
				type="password"
				placeholder="Confirm password"
			/>
			<button
				onClick={(e) => {
					e.preventDefault();
					handleSubmit('sign-up__form');
				}}
			>
				Sign Up
			</button>
		</form>
	</div>
);

export const SignInForm = ({ error, handleErrors, handleSubmit }) => (
	<div className="form-container sign-in-container">
		<form id={'sign-in__form'}>
			<h1>Sign in</h1>
			<input
				className="input"
				data-colname={'email'}
				type="name"
				placeholder="Email"
			/>
			{error.status === 404 ? (
				<span className="error-msg">{error.msg}</span>
			) : null}
			<input
				className="input"
				data-colname={'password'}
				type="password"
				placeholder="Password"
			/>
			{error.status === 401 ? (
				<span className="error-msg">{error.msg}</span>
			) : null}
			<br />
			<button
				onClick={(e) => {
					e.preventDefault();
					handleSubmit('sign-in__form');
				}}
			>
				Sign In
			</button>
		</form>
	</div>
);
