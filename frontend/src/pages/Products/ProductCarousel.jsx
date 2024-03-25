import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore, } from "react-icons/fa";

const ProductCarousel = () => {
    const {data: products, isLoading, error} = useGetTopProductsQuery();
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    }


    return (
        <div className="mb-4 xl:block lg:block md:block">
            {isLoading ? null : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.message}
                </Message>
            ) : <Slider {...settings} className="xl:w-[50rem] lg:w-[50rem] md:w-[30rem] sm:w-[40rem] sm:block">
                {
                    products.map(({image, _id, name, price, description, brand, createdAt, numReviews, rating, quantity, countInStock}) => (
                        <div key={_id}>
                            <img src={image} alt={name} className="w-[90%] rounded-lg object-cover h-[30rem] ml-5" />

                            <div className="flex justify-between w-[20rem] mt-4">
                                <div className="one">
                                    <h2 className="font-bold underline">{name}</h2> <br />
                                    <p className="text-teal-400 font-bold">NGN {price}</p> <br /> 
                                    <p className="w-[25rem] italic text-gray-300 ">{description.substring(0, 170)}...</p>
                                </div>

                                <div className="flex justify-between w-[20rem]">
                                    <div className="one">
                                        <h1 className="flex items-center mb-6 w-[15rem]">
                                            <FaStore className="mr-2 text-teal-400" /> Brand: {brand}
                                        </h1>
                                        <h1 className="flex items-center mb-6 w-[15rem]">
                                            <FaClock className="mr-2 text-blue-400" /> Added: {" "} {moment(createdAt).fromNow()}
                                        </h1>
                                        <h1 className="flex items-center mb-6 w-[15rem]">
                                            <FaStar className="mr-2 text-red-400" /> Reviews: {" "} {numReviews}
                                        </h1>
                                    </div>
                                    <div className="two">
                                        <h1 className="flex items-center mb-6 w-[10rem]">
                                            <FaStar className="mr-2 text-yellow-400" /> Ratings: {Math.round(rating)}
                                        </h1>
                                        <h1 className="flex items-center mb-6 w-[10rem]">
                                            <FaShoppingCart className="mr-2 text-white" /> {" "} Quantity: {quantity}
                                        </h1>
                                        <h1 className="flex items-center mb-6 w-[10rem]">
                                            <FaBox className="mr-2 text-teal-400" /> In Stock: {countInStock}
                                        </h1>
                                    </div>
                                </div>

                            </div>

                        </div>
                    ))
                }
                </Slider>}
        </div>
    )
}

export default ProductCarousel;