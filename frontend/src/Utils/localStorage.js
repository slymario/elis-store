//Add a product to a localStorage
export const addFavoriteToLocalStorage = (product) => {
    const favorites = getFavoritesFromLocalStorage();
    if (!favorites.some((p) => p.id === product._id)) {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    } 
};


//Remove a product from a localStorage
export const removeFavoriteFromLocalStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage();
    const updateFavorites = favorites.filter((product) => product._id !== productId);

    localStorage.setItem('favorites', JSON.stringify(updateFavorites));
}



//Retrieve a product from a localStorage
export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem('favorites');
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};