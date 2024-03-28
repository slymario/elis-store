import { useState } from "react"
import PropTypes from 'prop-types';
import { Link } from "react-router-dom"
import Ratings from "./Ratings"
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice"
import SmallProduct from "./SmallProduct"
import Loader from "../../components/Loader"

const ProductTabs = ({loadingProductReview, userInfo, submitHandler, rating, comment, setRating, setComment, product}) => {
    const {data, isLoading} = useGetTopProductsQuery();

    const [activeTab, setActiveTab] = useState();

    if (isLoading) {
        return <Loader />
    }


    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    }



    return (
        <div className="flex flex-col md:flex-row">
            <section className="mr-[4rem]">
                <div 
                    className={`flex-1 rounded-lg py-2 px-4 text-center cursor-pointer text-lg ${activeTab === 1 ? "font-bold italic bg-blue-700 text-white" : ""}`}
                    onClick={() => handleTabClick(1)}
                >
                    Write Your Review
                </div>
                <div 
                    className={`flex-1 rounded-lg py-2 px-4 text-center cursor-pointer text-lg ${activeTab === 2 ? "font-bold italic bg-blue-700 text-white" : ""}`}
                    onClick={() => handleTabClick(2)}
                >
                    All Reviews
                </div>
                <div 
                    className={`flex-1 rounded-lg py-2 px-4 text-center cursor-pointer text-lg ${activeTab === 3 ? "font-bold italic bg-blue-700 text-white" : ""}`}
                    onClick={() => handleTabClick(3)}
                >
                    Related Products
                </div>
            </section>

            {/* Second Part */}
            <section>
                {activeTab === 1 && (
                    <div className="mt-4">
                        {userInfo ? (
                            <form onSubmit={submitHandler}>
                                <div className="my-2">
                                    <label htmlFor="rating" className="block text-xl mb-2">Rating</label>
                                    <select 
                                        id="rating"
                                        required
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                        className="p-2 border rounded-lg xl:w-[40rem] bg-gray-800 text-block"
                                    >
                                        <option value="">Select</option>
                                        <option value="1">Inferior</option>
                                        <option value="2">Decent</option>
                                        <option value="3">Great</option>
                                        <option value="4">Excellent</option>
                                        <option value="5">Exceptional</option>
                                    </select>
                                </div>

                                <div className="my-2">
                                    <label htmlFor="comment" className="block text-xl mb-2">Comment</label>
                                    <textarea 
                                        id="comment" 
                                        rows="3"
                                        required
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="p-2 corder bg-gray-200 rounded-lg xl:w-[40rem] text-black"
                                        placeholder="Write a comment"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loadingProductReview}
                                    className="bg-teal-600 text-white py-2 px-4 rounded-lg"
                                >
                                    Add Comment
                                </button>

                            </form>
                        ) : (
                            <p>Please <Link to='/login' className="text-teal-600 underline">Sign In</Link> to write a review</p>
                        )}
                    </div>
                )}
            </section>

            <section>
                {activeTab === 2 && (
                    <>
                    <div>
                        {product.reviews.length === 0 && <p className="text-red-500">No reviews yet...!</p>}
                    </div>

                    <div>
                        {product.reviews.map((review) => (
                            <div key={review._id} className="p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5 bg-[#1A1A1A]">
                                <div className="flex justify-between">
                                    <strong className="text-teal-500">{review.name}</strong>
                                    <p className="text-teal-500">{review.createdAt.substring(0, 10)}</p>
                                </div>
                                <p className="my-4">{review.comment}</p>
                                <Ratings value={review.rating} />
                            </div>
                        ))}
                    </div>
                    </>
                )}
            </section>

            <section>
                {activeTab === 3 && (
                    <section className="ml-[4rem] flex flex-wrap w-[50rem]">
                        {!data ? (
                            <Loader />
                        ) : (
                            data.map((product) => (
                                <div key={product._id}>
                                    <SmallProduct product={product} />
                                </div>
                            ))
                        )}
                    </section>
                )}
            </section>

        </div>
    )
}



ProductTabs.propTypes = {
    loadingProductReview: PropTypes.bool.isRequired,
    userInfo: PropTypes.object, // Adjust the PropTypes according to the actual type
    submitHandler: PropTypes.func.isRequired,
    rating: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    setRating: PropTypes.func.isRequired,
    setComment: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired, // Adjust the PropTypes according to the actual type
};

export default ProductTabs;