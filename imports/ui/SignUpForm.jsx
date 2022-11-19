import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';

export const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submit = e => {
        e.preventDefault();
        Accounts.createUser({username, email, password}, error => {
            if (error) {
                setErrorMessage(error.reason);
            }
        });
    };

    return (
        <form onSubmit={submit} className="login-form">
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <div className='pb-2'>
                <button type="submit">Sign Up</button>
            </div>
        </form>
    );
};