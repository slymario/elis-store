import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import {useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {setCategories, setProducts, setChecked} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";


const Shop = () => {
    const {categories, products, checked, radio} = useSelector((state) => state.shop);
    const categoriesQuery = useFetchCategoriesQuery();
    const [priceFilter, setPriceFilter] = useState('');
    const filteredProductsQuery = useGetFilteredProductsQuery({checked, radio});
    const dispatch = useDispatch();

    useEffect(() => {
        if (!categoriesQuery.isLoading) {
            dispatch(setCategories(categoriesQuery.data));
        }
    }, [categoriesQuery.data, dispatch]);


useEffect(() => {
    if (!checked.length || !radio.length) {
        if (!filteredProductsQuery.isLoading) {
            // Filter products based on both checked categories and price filter
            const filteredProducts = filteredProductsQuery.data.filter((product) => {
                // Check if the product price includes the entered price filter value
                return (
                    product.price.toString().includes(priceFilter) || product.price === parseInt(priceFilter, 10)
                );
            })
            dispatch(setProducts(filteredProducts));
        }
    }
}, [checked, radio, priceFilter, filteredProductsQuery.data, dispatch]);

const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
        (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
};

const handleCheck = (value, id) => {
    const updatedChecked = value ? [...checked, id] : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
};

// Add "All Brands" options to uniqueBrands
const uniqueBrands = [
    ...Array.from(
        new Set(
            filteredProductsQuery.data?.map((product) => product.brand).filter((brand) => brand !== undefined)
        )
    ),
];

const handlePriceChange = (e) => {
    //Update the price filter state when the user types in the input field
    setPriceFilter(e.target.value);
}


    return (
        <>
            <div className="container mx-auto">
                <div className="flex md:flex-row">
                    <div className="bg-[#262525] p-[3rem] mt-2 mb-2 rounded-lg">
                        <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
                            Filter By Categories
                        </h2>

                        <div className="p-5 w-[15rem]">
                            {categories?.map((c) => (
                                <div key={c._id} className="mb-2">
                                    <div className="flex items-center mr-4">
                                        <input 
                                            type="checkbox" 
                                            id="red-checkbox" 
                                            onChange={(e) => handleCheck(e.target.checked, c._id)} 
                                            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded
                                            focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800
                                            focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="pink-checkbox" className="ml-2 text-sm font-medium text-white dark:text-gray-300">{c.name}</label>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
                            Filter By Brands
                        </h2>
                        <div className="p-5">
                            {uniqueBrands?.map((brand) => (
                                <>
                                    <div className="flex items-center mr-4 mb-5">
                                        <input 
                                            type="radio" 
                                            id={brand}
                                            name="brand"
                                            onChange={() => handleBrandClick(brand)}
                                            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded
                                            focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800
                                            focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="red-radio" className="ml-2 text-sm font-medium text-white dark:text-gray-300">{brand}</label>
                                    </div>
                                </>
                            ))}
                        </div>

                        <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
                            Filter By Price
                        </h2>
                        <div className="p-5 w-[15rem]">
                            <input 
                                type="text" 
                                placeholder="Enter Price"
                                value={priceFilter}
                                onChange={handlePriceChange}
                                className="w-full px-3 py-2 placeholder-gray-500 border rounded-lg
                                focus:outline-none focus:ring focus:border-red-400"
                                />
                        </div>

                        <div className="p-5 pt-0">
                            <button className="w-full bg-red-800 text-white rounded-lg hover:bg-red-600 my-4" onClick={() => window.location.reload()}>
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="p-3">
                        <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
                        <div className="flex flex-wrap">
                            {products.length === 0 ? (
                                <Loader />
                            ) : (
                                products?.map((p) => (
                                    <div key={p._id} className="p-3">
                                        <ProductCard p={p} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shop