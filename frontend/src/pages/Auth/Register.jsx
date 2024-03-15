import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import {toast} from "react-toastify";
import Loader from "../../components/Loader";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [register, {isLoading}] = useRegisterMutation();
    const {userInfo} = useSelector(state => state.auth)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';


    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo]);


    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password do not match")
        } else {
            try {
                const res = await register({username, email, password}).unwrap();
                dispatch(setCredentials({...res}))
                navigate(redirect);
                toast.success("Registeration successful");
            } catch (error) {
                console.log(error);
                toast.error(error.data.message);
            }
        }
    };


    return (
        <section className="pl-[10rem] flex flex-wrap">
            <div className="mr-[4rem] mt-[5rem]">
                <h1 className="text-2xl font-semibold mb-4">Register</h1>

                <form onSubmit={submitHandler} className="container w-[40rem]">
                    <div className="my-[2rem]">
                        <label htmlFor="name" className="block text-sm font-medium">Username</label>
                            <input 
                                type="text" 
                                id="name" 
                                placeholder="Enter your username..."
                                className="mt-1 p-2 border rounded w-full bg-gray-300" 
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="Enter your email address..."
                                className="mt-1 p-2 border rounded w-full bg-gray-300" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                            <input 
                                type="text" 
                                id="password" 
                                placeholder="Enter your password..." 
                                className="mt-1 p-2 border rounded w-full bg-gray-300" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
                            <input 
                                type="text" 
                                id="confirmPassword" 
                                placeholder="Confirm your password..." 
                                className="mt-1 p-2 border rounded w-full bg-gray-300" 
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                    </div>

                    <button 
                            disabled={isLoading}
                            type="submit"
                            className="bg-teal-500 hover:bg-teal-800 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </button>

                        {isLoading && <Loader />}
                </form>

                <div className="mt-4">
                        <p className="text-red-600">
                            Already a customer? {" "}
                            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-teal-600 hover:underline">Sign In.</Link>
                        </p>
                </div>
            </div>
        </section>
    )
}

export default Register;