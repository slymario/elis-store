import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress, savePaymentMethod } from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";


const Shipping = () => {
    const cart = useSelector((state) => state.cart);
    const {shippingAddress} = cart;

    const [paymentMethod, setPaymentMethod] = useState('Paystack');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(saveShippingAddress({address, city, postalCode, country}));
        dispatch(savePaymentMethod({paymentMethod}));
        navigate("/placeorder");
    }

    //Payment
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate("/shipping")
        }
    }, [navigate, shippingAddress]);


    return (
        <div className="container mx-auto mt-10">
            <ProgressSteps step1 step2 />
            <div className="mt-[10rem] flex justify-around items-center flex-wrap">
                <form onSubmit={submitHandler} className="w-[40rem]">
                    <h1 className="text-2xl font-semibold mb-8">Shipping</h1>
                    <div className="mb-4">
                        <label className="block text-white mb-2">Address</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border rounded-lg" 
                            placeholder="Enter Your Address" 
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white mb-2">City</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border rounded-lg" 
                            placeholder="Enter Your City" 
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white mb-2">Country</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border rounded-lg" 
                            placeholder="Enter Your Country" 
                            value={country}
                            required
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white mb-2">Postal Code</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border rounded-lg" 
                            placeholder="Enter Your Postal Code" 
                            value={postalCode}
                            required
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-400">Select Payment</label>
                        <div className="mt-2">
                            <label className="inline-flex items-center">
                                <input 
                                    type="radio" 
                                    className="form-radio text-red-500"
                                    name="paymentMethod"
                                    value="Paystack"
                                    checked={paymentMethod === "Paystack"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <span className="ml-2">Paystack or Credit Card</span>
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-800 py-2 px-4 rounded-full text-lg w-full">
                        Continue
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Shipping;