import React, { useEffect, useState } from 'react';
import api from '../Api/Api'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const Authentication = () => {
    const navigate = useNavigate()
    const [loginInputs, setLoginInputs] = useState({ emailOrUsername: '', password: '' });
    const [signupInputs, setSignupInputs] = useState({ username: '', email: '', password: '' });
    const [isSignUp, setIsSignUp] = useState(false);

    const handleToggle = () => {
        setIsSignUp(!isSignUp);
    };

    useEffect(() => {
        const userinstorage = sessionStorage.getItem('access_token')
        const userFromStorage = JSON.parse(userinstorage);

        if (userFromStorage) {
            navigate('/');
            return;
        }

    }, [])

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginInputs({
            ...loginInputs,
            [name]: value
        });
    };

    const handleSignupInputChange = (e) => {
        const { name, value } = e.target;
        setSignupInputs({
            ...signupInputs,
            [name]: value
        });
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        // Handle sign in logic
        console.log('Signing in with:', loginInputs.email, loginInputs.password);

        const loading = toast.loading('wait! Authentication is in progress')
        api.post('/login', loginInputs).then((res) => {
            console.log(res.data);
            sessionStorage.setItem('access_token', JSON.stringify(res.data.access_token))
            sessionStorage.setItem('status', JSON.stringify(res.data.status))
            sessionStorage.setItem('_id', JSON.stringify(res.data._id))
            toast.dismiss(loading)
            navigate('/')
            return toast.success("login done successfully")
        })
            .catch(err => {
                console.log(err);
                toast.dismiss(loading)
                return toast.error(err.response.data.error)
            })
    };

    const handleSignupSubmit = (event) => {
        event.preventDefault();
        console.log('Signing up with:', signupInputs.username, signupInputs.email, signupInputs.password);

        const loading = toast.loading('wait! Authentication is in progress')



        api.post('/signup', signupInputs).then((res) => {

            console.log(res.data);
            sessionStorage.setItem('access_token', JSON.stringify(res.data.access_token))
            sessionStorage.setItem('status', JSON.stringify(res.data.status))
            sessionStorage.setItem('_id', JSON.stringify(res.data._id))

            toast.dismiss(loading)
            navigate('/')
            return toast.success("sign-up done successfully")
        })
            .catch(err => {
                console.log(err);
                toast.dismiss(loading)
                return toast.error(err.response.data.error)
            })



    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">Welcome to CampusConnect</h2>
                <h5 className="text-2xl font-semibold mb-4 text-center">Please Proceed</h5>
                {isSignUp ? (
                    <form onSubmit={handleSignupSubmit}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="input"
                            value={signupInputs.username}
                            onChange={handleSignupInputChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="input"
                            value={signupInputs.email}
                            onChange={handleSignupInputChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input"
                            value={signupInputs.password}
                            onChange={handleSignupInputChange}
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md"
                        >
                            Sign Up
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleLoginSubmit}>
                        <input
                            type="text"
                            name="emailOrUsername"
                            placeholder="emailOrUsername"
                            className="input"
                            value={loginInputs.emailOrUsername}
                            onChange={handleLoginInputChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input"
                            value={loginInputs.password}
                            onChange={handleLoginInputChange}
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md"
                        >
                            Sign In
                        </button>
                    </form>
                )}
                <p className="text-center mt-4">
                    {isSignUp ? "Already have an account? " : "Don't have an account? "}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={handleToggle}
                    >
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Authentication;
