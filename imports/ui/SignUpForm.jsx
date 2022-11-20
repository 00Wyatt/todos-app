import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';

export const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submit = e => {
        e.preventDefault();
        Accounts.createUser({ username, email, password }, error => {
            if (error) {
                setErrorMessage(error.reason);
            }
        });
    };

    return (
        <form className="text-darkGrey form mb-3" onSubmit={submit}>
            <div>
                <label className="label" htmlFor="username">Username</label>
                <input
                    className="input mt-1"
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label className="label" htmlFor="email">Email</label>
                <input
                    className="input mt-1"
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label className="label" htmlFor="password">Password</label>
                <input
                    className="input mt-1"
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <div className="grid justify-center">
                <button className='button' type="submit">Sign Up</button>
            </div>
        </form>
    );
};