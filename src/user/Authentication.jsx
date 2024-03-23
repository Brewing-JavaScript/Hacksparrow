import React, { useEffect, useState } from 'react';
import api from '../Api/Api'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const Authentication = () => {
    const navigate = useNavigate()
    const [loginInputs, setLoginInputs] = useState({ emailOrUsername: '', password: '' });
    const [signupInputs, setSignupInputs] = useState({ username: '', email: '', password: '', country: '' });
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
            navigate('/recomendation')
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
        console.log(signupInputs);
        



        api.post('/signup', signupInputs).then((res) => {

            console.log(res.data);
            sessionStorage.setItem('access_token', JSON.stringify(res.data.access_token))
            sessionStorage.setItem('status', JSON.stringify(res.data.status))
            sessionStorage.setItem('_id', JSON.stringify(res.data._id))

            toast.dismiss(loading)
            navigate('/recomendation')
            return toast.success("sign-up done successfully")
        })
            .catch(err => {
                console.log(err);
                toast.dismiss(loading)
                return toast.error(err.response.data.error)
            })



    };

    return (
        <div style={{ backgroundColor: "#0c0c0c" }} className="min-h-screen flex justify-center items-center bg-gray-200">
            <div className="text-white p-8 rounded-lg shadow-md" style={{ width: "40%" }}>
                {/* <h2 className="text-2xl font-semibold mb-4 text-center">Welcome to CampusConnect</h2> */}
                {isSignUp ? (
                    <h2 style={{ fontSize: "2rem" }} className="mb-8 mt-4 font-bold leadiF">Create an account</h2>
                ) :
                    <h2 className="mb-12 mt-4 text-4xl font-bold leadiF sm:text-5xl"> Sign In</h2>}

                {isSignUp ? (
                    <form onSubmit={handleSignupSubmit}>
                        <div className="flex ">
                            <div className='mr-4 flex-1'>
                                <label>First Name</label>
                                <input
                                    style={{ backgroundColor: "#0c0c0c" }}
                                    type="text"
                                    name="username"
                                    placeholder="Firt Name"
                                    className="input mt-2  "
                                    value={signupInputs.username}
                                    onChange={handleSignupInputChange}
                                />
                            </div>

                            <div className='flex-1'>
                                <label>Last Name</label>
                                <input
                                    style={{ backgroundColor: "#0c0c0c" }}
                                    type="text"
                                    name="username"
                                    placeholder="Last Name"
                                    className="input mt-2  "
                                    // value={signupInputs.username}
                                    onChange={handleSignupInputChange}
                                />
                            </div>
                        </div>
                        <label>Email address</label>
                        <input
                            style={{ backgroundColor: "#0c0c0c" }}
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="input mt-2  "
                            value={signupInputs.email}
                            onChange={handleSignupInputChange}
                        />


                        <div className="flex">
                            <div className='flex-1 mr-4'>
                                <label htmlFor="country">Country</label>
                                <select
                                    style={{ backgroundColor: "#0c0c0c", color: "white" }}
                                    id="country"
                                    name="country"
                                    className="input mt-2  "
                                    onChange={handleSignupInputChange}
                                    value={signupInputs.country}
                                >
                                    <option value="">Select your country</option>
                                    <option value="in">India</option>
                                    <option value="us">USA</option>
                                    <option value="ca">Canada</option>
                                    <option value="uk">UK</option>
                                </select>
                            </div>

                            <div className='flex-1'>
                                <label htmlFor="gender">Gender</label>
                                <select
                                    style={{ backgroundColor: "#0c0c0c", color: "white" }}
                                    id="gender"
                                    name="gender"
                                    className="input mt-2  "
                                    onChange={handleSignupInputChange}
                                // value={signupInputs.country} 
                                >
                                    <option value="">Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                    <option value="Prefernot">Prefer not to say</option>
                                </select>
                            </div>
                        </div>


                        <label>Password</label>
                        <input
                            style={{ backgroundColor: "#0c0c0c" }}
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input mt-2  "
                            value={signupInputs.password}
                            onChange={handleSignupInputChange}
                        />


                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded"
                        >
                            Sign Up
                        </button>

                        <div class="inline-flex items-center">
                            <label class="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3" htmlFor="remember">
                                <input style={{ background: "black" }} type="checkbox"
                                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                    id="remember" />
                                <span
                                    class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                        stroke="currentColor" stroke-width="1">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </span>
                            </label>
                            <label class="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="remember">
                                <p class="flex items-center font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                                    I agree the
                                    <a href="#" class="font-medium transition-colors hover:text-gray-900">
                                        &nbsp;Terms and Conditions
                                    </a>
                                </p>
                            </label>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleLoginSubmit}>
                        <label>User Name</label>
                        <input
                            style={{ backgroundColor: "#0c0c0c" }}
                            type="text"
                            name="emailOrUsername"
                            placeholder="emailOrUsername"
                            className="input mt-2"
                            value={loginInputs.emailOrUsername}
                            onChange={handleLoginInputChange}
                        />
                        <label>Password</label>
                        <input
                            style={{ backgroundColor: "#0c0c0c" }}
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input mt-2"
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
