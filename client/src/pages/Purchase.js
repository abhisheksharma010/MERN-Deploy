import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import Layout from '../componenets/layout/Layout';
import "../styles/Purchase.css"
const Purchase = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [address, setAddress] = useState("");

    let maxQuantity = 12;

    useEffect(() => {
        if (params?.slug) {
            getProduct();
        }
    }, [params?.slug]);
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/get-product/${params.slug}`
            );
            console.log(data);
            setProduct(data?.product);
            maxQuantity = data?.product.quantity || maxQuantity;
            console.log(maxQuantity);
        } catch (error) {
            console.log(error);
        }
    };

    const increaseQuantity = () => {
        if (quantity < maxQuantity) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const handlePurchase = async () => {
        const quan = quantity
        try {
            const response = await axios.post('/api/v1/order/add-order', {
                address,
                quan,
                productId: product._id,
            });
            navigate(`/dashboard/user/orders`);


            // Handle success (e.g., show a success message, redirect, etc.)
            console.log(response.data);
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Error making purchase:', error);
        }
    };



    return (
        <Layout>
            <div className="row container mt-2">
                <div className="col-md-6">
                    <img className="center"
                        src={`/api/v1/product/product-photo/${product?._id}`}

                        alt={product.name}
                        height="200"
                        width={"200px"}
                    />
                    <h1 className="text-center">Product Details</h1>
                    <h6>Name: {product.name}</h6>
                    <h6>Description: {product.description}</h6>
                    <h6>Price: {product.price}</h6>
                    <h6>Category: {product?.category?.name}</h6>
                </div>
                <div className="col-md-2 decide">
                    <div className="quantity-controls">
                        <button className="btn btn-secondary ms-1" onClick={decreaseQuantity}>-</button>
                        <span className="quantity">{quantity}</span>
                        <button className="btn btn-secondary ms-1" onClick={increaseQuantity}>+</button>
                    </div>
                    <div className="address">
                        <input
                            type="text"
                            className="form-control mt-3"
                            placeholder="Enter your address"
                            value={address}
                            onChange={handleAddressChange}
                        />
                    </div>
                    <div className="price">
                        Price: ${quantity * product.price}
                    </div>
                    <button className="btn btn-success ms-1" onClick={handlePurchase}>Purchased</button>
                </div>

                {/* ... (rest of the code) */}

            </div>
        </Layout>
    );
};

export default Purchase;
