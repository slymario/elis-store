import {Link} from "react-router-dom";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch } from "react-redux";
import {addToCart} from "../../redux/features/cart/cartSlice";
import {toast} from "react-toastify";
import HeartIcon from './HeartIcon';
import PropTypes from 'prop-types';


const ProductCard = ({p}) => {
    const dispatch = useDispatch();


    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({...product, qty}));
        toast.success("Product added successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
        })
    };


    return (
        <div className="max-w-xs h-full mx-auto relative bg-[#1A1A1A] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <section className="relative">
                <Link to={`/product/${p._id}`}>
                    <span className="absolute bottom-3 right-3 bg-teal-100 text-teal-800 text-sm font-medium
                    mr-2 px-2.5 py-0.5 rounded-full dark:bg-teal-900 dark:text-teal-300">
                        {p?.brand}
                    </span>
                    <img src={p.image} alt={p.name} style={{height: '200px', objectFit: 'cover'}} className="cursor-pointer w-full" />
                </Link>
                <HeartIcon product={p} />
            </section>
            <div className="p-5">
                <div className="flex justify-between">
                    <h5 className="mb-2 text-lg text-white whitespace-normal dark:text-white">{p.name}</h5>
                    <p className="font-bold text-teal-500 pt-1 ml-2">
                        {p?.price?.toLocaleString('en-NG', {
                            style: "currency",
                            currency: "NGN",
                        })}
                    </p>
                </div>
                <p className="mb-3 font-normal text-[#CFCFCF] whitespace-normal">
                    {p?.description?.substring(0, 60)} ...
                </p>

                <section className="flex justify-between items-center">
                    <Link
                        to={`/product/${p._id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white
                        bg-teal-600 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none
                        focus:ring-teal-300 dark:b-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                    >
                        View Details

                        <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path 
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </Link>

                    <button className="p-2 rounded-full" onClick={() => addToCartHandler(p, 1)}>
                        <AiOutlineShoppingCart size={28} className="text-green-500" />
                    </button>
                </section>
            </div>
        </div>
    )
}

ProductCard.propTypes = {
    p: PropTypes.object.isRequired,
};

export default ProductCard;