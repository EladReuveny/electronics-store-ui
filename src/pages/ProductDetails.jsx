import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../api requests/product api's/product";
import { addProductToWishList } from "../api requests/wishList api's/wishList";
import { addProductToCart } from "../api requests/shoppingCart api's/shoppingCart";
import { AuthContext } from "../context/AuthContext";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const { user } = useContext(AuthContext);
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductById = async (productId) => {
      try {
        const productData = await getProductById(productId);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product: ", error);
      }
    };

    fetchProductById(productId);
  }, []);

  const handleAddProductToWishList = async (user, productId) => {
    if (!user) {
      alert("Please log in first.");
      navigate("/login");
    }

    try {
      const response = await addProductToWishList(user.id, productId);
      alert("Product added to wishlist!");
    } catch (error) {
      console.error("Error adding product to wishlist");
    }
  };

  const handleAddProductToCart = async (user, productId, quantity) => {
    if (!user) {
      alert("Please log in first.");
      navigate("/login");
    }

    try {
      const response = await addProductToCart(user.id, productId, quantity);
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding product to cart");
    }
  };

  return (
    <section className="product" id="product">
       <div className="section__title">
        <h1>Product Details</h1>
      </div>

      <div className="product__container">
        <img src={product.imgUrl} alt={product.name} />
        <div className="product-details">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
        <div className="product__add-to">
          <button
            className="add-to-wishlist"
            onClick={() => handleAddProductToWishList(user, productId)}
          >
            <i className="fa-solid fa-heart"></i>
          </button>
          <label htmlFor="quantity"></label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
          />
          <button
            className="add-to-cart"
            onClick={() => handleAddProductToCart(user, productId, quantity)}
          >
            <i className="fa-solid fa-shopping-cart"></i>
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
