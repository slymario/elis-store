import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import PropTypes from 'prop-types';

const Product = ({product}) => {
    return (
        <div className="w-[25rem] ml-[2rem] p-3 relative">
            <div className="relative">
                <img src={product.image} alt={product.name} className="w-[30rem] h-[25rem] rounded" />
                <HeartIcon product={product} />
            </div>

            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                <h2 className="flex justify-between items-center">
                    <div className="text-lg">{product.name}</div>
                    <span className="bg-teal-100 text-teal-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">{product?.price?.toLocaleString('en-NG', {
                            style: "currency",
                            currency: "NGN",
                        })}</span>
                </h2>
                </Link>
            </div>

        </div>
    )
}


Product.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};

export default Product;