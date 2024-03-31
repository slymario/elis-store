import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {toast} from "react-toastify";
import { useGetProductDetailsQuery, useCreateReviewMutation } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";



const ProductDetails = () => {
    const {id: productId} = useParams();
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const {data: product, isLoading, refetch, error} = useGetProductDetailsQuery(productId);
    const {userInfo} = useSelector((state) => state.auth);
    const [createReview, {isLoading: loadingProductReview}] = useCreateReviewMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await createReview({productId, rating, comment}).unwrap();
            refetch();
            toast.success("Review added successfuly")
        } catch (error) {
            toast.error(error?.data || error.message)
        }
    };


    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}))
        toast.success("Item added successfuly")
        navigate('/cart');
    };



    return (
        <>
            <div>
                <Link to='/' className="text-white font-semibold hover:underline ml-[10rem]">
                    Go Back
                </Link>
            </div>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    (error?.data?.message || error.message)
                </Message>
            ) : (
                <>
                    <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
                        <div>
                            <img src={product.image} alt={product.name} className="w-full xl:w-[40rem] lg:w-[35rem] md:w-[30rem] sm:w-[20rem] mr-[2rem]" />
                            <HeartIcon product={product} />
                        </div>

                        <div className="flex flex-col justify-between">
                            <h2 className="text-2xl font-semibold">{product.name}</h2>
                            <p className="my-4 xl:w-[30rem] lg:w-[25rem] md:w-[20rem] text-[#B0B0B0]">{product.description}</p>
                            <p className="text-5xl my-4 font-extrabold">NGN {product.price}</p>

                            <div className="flex items-center justify-between w-[20rem]">
                                <div className="one">
                                    <h1 className="flex items-center mb-4">
                                        <FaStore className="mr-2 text-white" /> Brand: {" "} {product.brand}
                                    </h1>
                                    <h1 className="flex items-center mb-4">
                                        <FaClock className="mr-2 text-white" /> Added: {" "} {moment(product.createdAt).fromNow()}
                                    </h1>
                                    <h1 className="flex items-center mb-4">
                                        <FaStar className="mr-2 text-white" /> Reviews: {" "} {product.numReviews}
                                    </h1>
                                </div>

                                <div className="two">
                                    <h1 className="flex items-center mb-4">
                                        <FaStar className="mr-2 text-white" /> Ratings: {" "} {rating}
                                    </h1>
                                    <h1 className="flex items-center mb-4">
                                        <FaShoppingCart className="mr-2 text-white" /> Quantity: {" "} {product.quantity}
                                    </h1>
                                    <h1 className="flex items-center mb-4">
                                        <FaBox className="mr-2 text-white" /> In Stock: {" "} {product.countInStock}
                                    </h1>
                                </div>
                            </div>

                            <div className="flex justify-between flex-wrap">
                                <Ratings value={product.rating} text={`${product.numReviews} reviews`} />
                                {product.countInStock > 0 && (
                                    <div>
                                        <select 
                                            value={qty}
                                            onChange={(e) => setQty(e.target.value)}
                                            className="p-2 w-[6rem] rounded-lg bg-gray-800"
                                        >
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="btn-container">
                                <button
                                    onClick={addToCartHandler}
                                    disabled={product.countInStock === 0}
                                    className="bg-teal-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>

                        <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
                            <ProductTabs 
                                loadingProductReview={loadingProductReview} 
                                userInfo={userInfo}
                                rating={rating}
                                setRating={setRating}
                                comment={comment}
                                setComment={setComment}
                                product={product}
                                submitHandler={submitHandler}
                            />
                        </div>

                    </div>
                </>
            )}
        </>
    )
}

export default ProductDetails;