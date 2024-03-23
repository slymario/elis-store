import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <>
            <button 
                onClick={toggleMenu}
                className={`${isMenuOpen ? "top-2 right-2" : "top-5 right-7"} bg-[#151515] p-2 fixed rounded-lg`}
            >
                {isMenuOpen ? (
                    <FaTimes color="red" />
                ) : (
                    <>
                        <div className="w-6 h-0.5 bg-teal-500 my-1"></div>
                        <div className="w-5 h-0.5 bg-pink-600 my-1"></div>
                        <div className="w-6 h-0.5 bg-teal-500 my-1"></div>
                    </>
                )}
            </button>

            {isMenuOpen && (
                <section className="bg-[#1c1c1c] p-4 fixed right-7 top-5 rounded-lg">
                    <ul className="list-none mt-2">
                        <li>
                            <NavLink 
                                to="/admin/dashboard" 
                                className="list-item py-2 px-3 mb-5 hover:bg-[#2c2b2b] rounded-sm"
                                style={({isActive}) => ({
                                    color: isActive ? "greenyellow" : "white"
                                })}
                            >
                                Admin Dasboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/admin/categorylist" 
                                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                                style={({isActive}) => ({
                                    color: isActive ? "greenyellow" : "white"
                                })}
                            >
                                Create Category
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/admin/productlist" 
                                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                                style={({isActive}) => ({
                                    color: isActive ? "greenyellow" : "white"
                                })}
                            >
                                Create Product
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/admin/allproductslist" 
                                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                                style={({isActive}) => ({
                                    color: isActive ? "greenyellow" : "white"
                                })}
                            >
                                All Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/admin/userlist" 
                                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                                style={({isActive}) => ({
                                    color: isActive ? "greenyellow" : "white"
                                })}
                            >
                                Manage Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/admin/orderlist" 
                                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                                style={({isActive}) => ({
                                    color: isActive ? "greenyellow" : "white"
                                })}
                            >
                                Manage Orders
                            </NavLink>
                        </li>
                    </ul>
                </section>
            )}
        </>
    )
}

export default AdminMenu