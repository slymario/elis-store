import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import {toast} from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
    const {userInfo} = useSelector(state => state.auth)
    const [login, {isLoading}] = useLoginMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({email, password}).unwrap();
            console.log(res);
            dispatch(setCredentials({...res}))
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    };


    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo]);



    return (
        <div className="">
            <section className="pl-[10rem] flex flex-wrap">
                <div className="mr-[4rem] mt-[5rem]">
                    <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

                    <form onSubmit={submitHandler} className="container w-[40rem]">
                        <div className="my-[2rem]">
                            <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="Enter your email address"
                                className="mt-1 p-2 border rounded w-full bg-gray-300" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="my-[2rem]">
                            <label htmlFor="password" className="block text-sm font-medium">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="Enter your password" 
                                className="mt-1 p-2 border rounded w-full bg-gray-300" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <button 
                            disabled={isLoading}
                            type="submit"
                            className="bg-teal-500 hover:bg-teal-800 text-white px-4 py-2 rounded-md cursor-pointer my-[1rem]"
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </button>

                        {isLoading && <Loader />}
                    </form>

                    <div className="mt-4">
                        <p className="text-red-600">
                            New customer? {" "}
                            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-teal-600 hover:underline">Register Here.</Link>
                        </p>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Login;