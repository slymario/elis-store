import { useState } from "react";
import { AiOutlineHome, AiOutlineShopping, AiOutlineShoppingCart, AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import "./Navigation.css";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
    const {userInfo} = useSelector((state) => state.auth)
    const [dropdownOpen, setDropDownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();



    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    }


    const toggleDropdown = () => {
        setDropDownOpen(!dropdownOpen);
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const closeSidebar = () => {
        setShowSidebar(false);
    };


    return (
        <div style={{ zIndex: 999 }} className={`${showSidebar ? "hidden" : "flex"} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`} id="navigation-container">
            <div className="flex flex-col justify-center space-y-4">
                <Link to='/' className="flex items-center transition-transform transform hover:translate-x-2">
                    <AiOutlineHome size={26} className="mr-2 mt-[3rem]" />
                    <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
                </Link>
                <Link to='/shop' className="flex items-center transition-transform transform hover:translate-x-2">
                    <AiOutlineShopping size={26} className="mr-2 mt-[3rem]" />
                    <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
                </Link>
                <Link to='/cart' className="flex relative">
                    <div className="flex items-center transition-transform transform hover:translate-x-2">
                        <AiOutlineShoppingCart size={26} className="mr-2 mt-[3rem]" />
                        <span className="hidden nav-item-name mt-[3rem]">CART</span>{" "}
                    </div>
                </Link>
                <Link to='/favorite' className="flex relative">
                    <div className="flex items-center transition-transform transform hover:translate-x-2">
                        <FaHeart size={26} className="mr-2 mt-[3rem] text-red-600" />
                        <span className="hidden nav-item-name mt-[3rem]">Favorite</span>{" "}
                        <FavoritesCount />
                    </div>
                </Link>
            </div>

            <div className="relative flex items-center">
                <button 
                    onClick={toggleDropdown}
                    className="flex items-center"
                >
                    {userInfo ? ( 
                        <span className="text-teal-500">{userInfo.username}</span>
                        ) : (
                            <></>
                    )}

                    {userInfo && (
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 ml-1 ${
                            dropdownOpen ? "transform rotate-180" : "rotate-180"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}    
                            />
                        </svg>
                    )}
                </button>

                {dropdownOpen && userInfo && (
                    <ul className={`absolute right-0 mt-4 rounded-lg space-y-1  max-h-85 bg-gray-200 text-black ${!userInfo.isAdmin ? "-top-20" : "-top-80"}`}>
                        {userInfo.isAdmin && (
                            <>
                                <li>
                                    <Link to='/admin/dashboard' className="block px-4 py-2 rounded-lg hover:bg-gray-600 hover:text-white">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to='/admin/productlist' className="block px-4 py-2 rounded-lg  hover:bg-gray-600 hover:text-white">Products</Link>
                                </li>
                                <li>
                                    <Link to='/admin/categorylist' className="block px-4 py-2 rounded-lg  hover:bg-gray-600 hover:text-white">Category</Link>
                                </li>
                                <li>
                                    <Link to='/admin/userlist' className="block px-4 py-2 rounded-lg  hover:bg-gray-600 hover:text-white">Users</Link>
                                </li>
                                <li>
                                    <Link to='/admin/orderlist' className="block px-4 py-2 rounded-lg  hover:bg-gray-600 hover:text-white">Orders</Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link to='/profile' className="block px-4 py-2 rounded-lg  hover:bg-gray-600 hover:text-white">Profile</Link>
                        </li>
                        <li>
                            <button onClick={logoutHandler} className="block w-full px-4 py-2 text-left rounded-lg  hover:bg-gray-600 hover:text-white">Logout</button>
                        </li>
                    </ul>
                )}
            </div>
                {!userInfo && (
                    <ul>
                <li>
                    <Link to='/login' className="flex items-center transition-transform transform hover:translate-x-2">
                        <AiOutlineLogin size={26} className="mr-2 mt-[3rem]" />
                        <span className="hidden nav-item-name mt-[3rem]">LOGIN</span>{" "}
                    </Link>
                </li>
                <li>
                    <Link to='/register' className="flex items-center transition-transform transform hover:translate-x-2">
                        <AiOutlineUserAdd size={26} className="mr-2 mt-[3rem]" />
                        <span className="hidden nav-item-name mt-[3rem]">REGISTER</span>{" "}
                    </Link>
                </li>
            </ul>
                )}
            
        </div>
    )
}

export default Navigation;