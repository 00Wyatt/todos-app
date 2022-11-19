import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { LoginWithGithub } from './LoginWithGithub';
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
        <div>
            {!newUser ? (
                <Fragment>
                    <form className="text-graniteGray h-full flex flex-col justify-center items-center" onSubmit={submit}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                className="w-full p-2"
                                type="text"
                                placeholder="Username"
                                name="username"
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                className="w-full p-2"
                                type="password"
                                placeholder="Password"
                                name="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                        <div className='bg-terraCotta text-white'>
                            <button type="submit">Log In</button>
                        </div>
                        <LoginWithGithub />
                    </form>
                </Fragment>
            ) : (
                <SignUpForm />
            )}
            <div className="filter">
                <button className="bg-spaceCadet text-white" onClick={() => { setNewUser(!newUser), setErrorMessage('') }}>
                    {newUser ? 'Already registered?' : 'New user?'}
                </button>
            </div>
        </div>
    );
};