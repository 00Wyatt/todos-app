import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { SignUpForm } from './SignUpForm';

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [newUser, setNewUser] = useState(false);

    const submit = e => {
        e.preventDefault();
        Meteor.loginWithPassword(username, password, error => {
            if (error) {
                setErrorMessage("Username or password is incorrect");
            }
        });
    };

    return (
        <div className="grid self-center md:self-start md:mt-44">
            {!newUser ? (
                <Fragment>
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
                            <button className='button' type="submit">Log In</button>
                        </div>
                    </form>
                </Fragment>
            ) : (
                <SignUpForm />
            )}
            <div className='grid justify-center'>
                <button className="button-outline" onClick={() => { setNewUser(!newUser), setErrorMessage('') }}>
                    {newUser ? 'Already registered?' : 'New user?'}
                </button>
            </div>
        </div>
    );
};