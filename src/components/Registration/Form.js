import React from 'react';
import Button from '@material-ui/core/Button';

export const SignUpForm = ({ error, handleErrors, handleSubmit }) => (
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
				className={`input ${error.status === 1 ? 'border-red-400' : null}`}
				data-colname={'email'}
				type="text"
				placeholder="Email"
			/>
			{error.status === 1 ? (
				<span className="error-msg">{error.msg}</span>
			) : null}
			<input
				className={`input ${error.status === 2 ? 'border-red-400' : null}`}
				data-colname={'password'}
				type="password"
				placeholder="Password"
			/>
			<input
				className={`input ${error.status === 2 ? 'border-red-400' : null}`}
				data-colname={'password_confirmation'}
				type="password"
				placeholder="Confirm password"
			/>
			{error.status === 2 ? (
				<span className="error-msg">{error.msg}</span>
			) : null}
			<br />
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
				className={`input ${error.status === 404 ? 'border-red-400' : null}`}
				data-colname={'email'}
				type="name"
				placeholder="Email"
			/>
			{error.status === 404 ? (
				<span className="error-msg">{error.msg}</span>
			) : null}
			<input
				className={`input ${error.status === 401 ? 'border-red-400' : null}`}
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
