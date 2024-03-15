import { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import {toast} from "react-toastify";
import Loader from "../../components/Loader";

const Profile = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();
    const {userInfo} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setUsername(userInfo.username);
        setEmail(userInfo.email);
    }, [userInfo.username, userInfo.email])


    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password do not match")
        } else {
            try {
                const res = await updateProfile({_id: userInfo._id, username, email, password}).unwrap();
                dispatch(setCredentials({...res}))
                navigate('/')
                toast.success("Profile Updated successfully");
            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        }
    };


    return (
        <div className="container mx-auto p-4 mt-[10rem]">
            <div className="flex justify-center align-center md:flex md:space-x-4">
                <div className="md:w-1/3">
                <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label className="block mb-1 font-semibold">Username</label>
                            <input 
                                type="text" 
                                placeholder="Enter your username"
                                className="form-input p-2 bg-gray-300 rounded-lg w-full"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-semibold">Email Address</label>
                            <input 
                                type="email" 
                                placeholder="Enter your email address"
                                className="form-input p-2 bg-gray-300 rounded-lg w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-semibold">Password</label>
                            <input 
                                type="text" 
                                placeholder="Enter your password"
                                className="form-input p-2 bg-gray-300 rounded-lg w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-semibold">Confirm Password</label>
                            <input 
                                type="text" 
                                placeholder="Confirm your password"
                                className="form-input p-2 bg-gray-300 rounded-lg w-full"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-between">
                            <button 
                                type="submit"
                                style={{ minWidth: '8rem', height: '2.5rem' }}
                                className="bg-teal-500 hover:bg-teal-800 text-white px-4 py-2 rounded-lg cursor-pointer my-[1rem]"
                            >
                                Update
                            </button>
                            <Link to='/user-orders' className="mt-[1.6rem]">
                                <span className="bg-pink-500 text-white py-2 px-5 rounded-lg hover:bg-pink-800">My Orders</span>
                            </Link>
                        </div>
                    </form>
                </div>
                {loadingUpdateProfile && <Loader />}
            </div>
        </div>
    )
}

export default Profile