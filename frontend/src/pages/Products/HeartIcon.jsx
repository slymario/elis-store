import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorites, removeFromFavorites, setFavorites } from "../../redux/features/favorites/favoriteSlice";
import { addFavoriteToLocalStorage, getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage } from "../../Utils/localStorage";
import PropTypes from 'prop-types';

const HeartIcon = ({product}) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites) || [];
    const isFavorite = favorites.some((p) => p._id === product._id);


    useEffect(() => {
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
        dispatch(setFavorites(favoritesFromLocalStorage));
    }, []);


    const toggleFavorites = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(product));
            //Remove from favorites from local storage as well
            removeFavoriteFromLocalStorage(product._id);
        } else {
            dispatch(addToFavorites(product));
            //Add the product to localStorage as well
            addFavoriteToLocalStorage(product);
        }
    }

    return (
        <div onClick={toggleFavorites} className="absolute top-2 right-5 cursor-pointer">
            {isFavorite ? (
                <FaHeart className="text-red-600" />
            ) : (
                <FaRegHeart className="text-white" />
            )}
        </div>
    )
}

HeartIcon.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
    }).isRequired,
};


export default HeartIcon