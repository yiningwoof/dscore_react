import React from 'react';
import './overlayStyles.css';

export const SignInOverlay = () => (
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<button
					onClick={() => {
						const container = document.getElementById('container');
						container.classList.remove('right-panel-active');
					}}
					className="ghost"
					id="signIn"
				>
					Sign In
				</button>
			</div>
			<div className="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<button
					onClick={() => {
						const container = document.getElementById('container');
						container.classList.add('right-panel-active');
					}}
					className="ghost"
					id="signUp"
				>
					Sign Up
				</button>
			</div>
		</div>
	</div>
);
