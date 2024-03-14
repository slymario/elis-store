import { useState } from "react";
import { AiOutlineHome, AiOutlineShopping, AiOutlineShoppingCart, AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import "./Navigation.css";

const Navigation = () => {
    const {userInfo} = useSelector(state => state.auth)
    const [dropdownOpen, setDropDownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLoginMutation();



    const loginHandler = async () => {
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
                <Link to='/cart' className="flex items-center transition-transform transform hover:translate-x-2">
                    <AiOutlineShoppingCart size={26} className="mr-2 mt-[3rem]" />
                    <span className="hidden nav-item-name mt-[3rem]">CART</span>{" "}
                </Link>
                <Link to='/favorite' className="flex items-center transition-transform transform hover:translate-x-2">
                    <FaHeart size={26} className="mr-2 mt-[3rem] text-red-600" />
                    <span className="hidden nav-item-name mt-[3rem]">Favorite</span>{" "}
                </Link>
            </div>

            <div className="relative">
                <button 
                    onClick={toggleDropdown}
                >
                    {userInfo ? ( 
                        <span className="text-teal-500">{userInfo.username}</span>
                        ) : (
                            <></>
                    )}
                </button>
            </div>

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
        </div>
    )
}

export default Navigation