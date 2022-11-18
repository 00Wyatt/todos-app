import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';

export const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = e => {
        e.preventDefault();
        Accounts.createUser({username, email, password}, error => {
            if (error) {
                console.error(error);
            }
            console.log("Success");
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
            <div className='pb-2'>
                <button type="submit">Sign Up</button>
            </div>
        </form>
    );
};