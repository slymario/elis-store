import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation, useDeleteProductMutation, useGetProductByIdQuery, useUploadProductImageMutation } from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import {toast} from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductUpdate = () => {
    const navigate = useNavigate();
    const params = useParams();
    const {data: productData, isSuccess} = useGetProductByIdQuery(params._id);
    const [image, setImage] = useState(productData?.image || '');
    const [name, setName] = useState(productData?.name || '');
    const [description, setDescription] = useState(productData?.description || '');
    const [price, setPrice] = useState(productData?.price || '');
    const [category, setCategory] = useState(productData?.category || '');
    const [quantity, setQuantity] = useState(productData?.quantity || '');
    const [brand, setBrand] = useState(productData?.brand || '');
    const [stock, setStock] = useState(productData?.countInStock);


    const [uploadProductImage] = useUploadProductImageMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const {data: categories = []} = useFetchCategoriesQuery();


    useEffect(() => {
        if (isSuccess && productData) {
            setName(productData.name);
            setDescription(productData.description);
            setImage(productData.image);
            setPrice(productData.price);
            setCategory(productData.categories?._id);
            setQuantity(productData.quantity);
            setBrand(productData.brand);
            setStock(productData.countInStock);
        }
    }, [isSuccess, productData]);


    const uploadFileHandler = async (e) => {
        const formData = new FormData()
        formData.append('image', e.target.files[0]);

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success("Item added successfully");
            setImage(res.image);
        } catch (error) {
            toast.error("Error uploading product image");
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('quantity', quantity);
            formData.append('brand', brand);
            formData.append('countInStock', stock);


            // Fetch existing reviews associated with the product
        const existingReviews = productData.reviews.map(review => ({
            name: review.user.username ? review.user.username : "Unknown", // Include existing review name
            rating: review.rating,
            comment: review.comment
            // Include other review fields as needed
        }));
        
        // Append existing reviews to formData
        existingReviews.forEach((review, index) => {
            Object.entries(review).forEach(([key, value]) => {
                formData.append(`reviews.${index}.${key}`, value);
            });
        });
    
            const {data} = await updateProduct({productId: params._id, formData});
    
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success("Product updated successfully");
                navigate("/admin/allproductslist");
            }
        } catch (error) {
            console.error(error);
            toast.error("Product update failed");
        }
    };


    const handleDelete = async () => {
        try {
            let answer = window.confirm('Are you sure you want to delete this product?');
            if (!answer) return;

            const {data} = await deleteProduct(params._id);
            toast.success(`${data.name} is deleted successfully`)
            navigate("/admin/allproductslist");
        } catch (error) {
            console.log(error);
            toast.error("Product delete failed");
        }
    }
    

    return (
        <div className="container xl:mx-[9rem] sm:mx-[0]">
            <div className="flex flex-col md:flex-row">
                <AdminMenu />
                <div className="md:w-3/4 p-3">
                    <div className="h-12 font-bold text-center underline">UPDATE PRODUCT</div>

                    {image && (
                        <div className="text-center">
                            <img src={image} alt="product" className="block mx-auto max-h-[200px]" />
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="border text-teal-400 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                            {image ? image.name : "Upload Image"}

                            <input 
                                type="file" 
                                name="image" 
                                accept="image/*" 
                                className={!image ? "hidden" : "text-teal-400"} 
                                onChange={uploadFileHandler}
                            />
                        </label>
                    </div>

                    <div className="p-3">
                        <div className="flex flex-wrap">
                            <div className="one">
                                <label htmlFor="name" className=" text-teal-400">Name</label> <br />
                                <input 
                                    type="text"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="two ml-5">
                                <label htmlFor="name block" className=" text-teal-400">Price</label> <br />
                                <input 
                                    type="number"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" 
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap">
                            <div className="one">
                                <label htmlFor="name block" className=" text-teal-400">Quantity</label> <br />
                                <input 
                                    type="number"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" 
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="two ml-5">
                                <label htmlFor="name block" className=" text-teal-400">Brand</label> <br />
                                <input 
                                    type="text"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" 
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </div>
                        </div>

                        <label htmlFor="" className="my-5 text-teal-400">Description</label>
                        <textarea 
                            type="text"
                            className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>

                        <div className="flex justify-between">
                            <div>
                                <label htmlFor="name block" className="text-teal-400">Count In Stock</label> <br />
                                <input 
                                    type="text" 
                                    className="p-4 mb-3 w-[30rem] border rounded-lg text-white bg-[#101011]"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="" className="text-teal-400">Category</label> <br />
                                <select 
                                    placeholder="Choose Category"
                                    className="p-4 mb-3 w-[30rem] border rounded-lg text-white bg-[#101011]"
                                    onChange={e => setCategory(e.target.value)}
                                >
                                    {categories?.map ((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                                    </select>
                            </div>
                        </div>

                            <div>
                                <button 
                                    onClick={handleSubmit} 
                                    className="py-4 px-10 mt-5 rounded-lg text-lg text-black font-bold hover:text-white mr-6 bg-teal-500 hover:bg-teal-700"
                                >
                                    Update
                                </button>

                                <button 
                                    onClick={handleDelete} 
                                    className="py-4 px-10 mt-5 rounded-lg text-lg text-black font-bold hover:text-white bg-red-500 hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate