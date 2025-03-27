import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductsByCategory } from "../api requests/product api's/product";
import {
  addProductToWishList,
  getWishList,
  removeProductFromWishList,
} from "../api requests/wishList api's/wishList";
import { AuthContext } from "../context/AuthContext";

const ProductsByCategory = () => {
  const [products, setProducts] = useState([]);
  const [wishListProductsIds, setWishListProductsIds] = useState([]);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  let { category } = useParams();

  const fromCategoryToCategoryNames = {
    smart_phones: "SMART_PHONE",
    tablets: "TABLET",
    laptops: "LAPTOP",
    tvs: "TV",
  };

  const fromCategoryToCategoryName = {
    smart_phones: "Smart Phone",
    tablets: "Tablet",
    laptops: "Laptop",
    tvs: "TV",
  };

  const fromCategoryToCategoryTitle = {
    smart_phones: "Smart Phones",
    tablets: "Tablets",
    laptops: "Laptops",
    tvs: "TV's",
  };

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const productsData = await getProductsByCategory(
          fromCategoryToCategoryNames[category]
        );
        setProducts(productsData);

        if (user) {
          const wishListData = await getWishList(user.id);
          setWishListProductsIds(
            wishListData.products.map((product) => product.id)
          );
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  const handleAddProductToWishList = async (e, user, productId) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in first.");
      navigate("/login");
    }

    let updatedWishListData;

    try {
      if (wishListProductsIds.includes(productId)) {
        updatedWishListData = await removeProductFromWishList(
          user.id,
          productId
        );
        setWishListProductsIds((prevWishListProductsIds) =>
          [...prevWishListProductsIds].filter((id) => id !== productId)
        );
      } else {
        updatedWishListData = await addProductToWishList(user.id, productId);
        setWishListProductsIds((prevWishListProductsIds) => [
          ...prevWishListProductsIds,
          productId,
        ]);
      }
    } catch (error) {
      console.error("Error adding/removing product from wishlist:", error);
    }
  };

  return (
    <section className="products-categories">
      <div className="section-title">
        <h1>{fromCategoryToCategoryTitle[category]}</h1>
      </div>

      <p className="products-items-found">{products.length} Products found</p>

      <div className="products-container">
        {products.map((product) => (
          <div key={product.id} className="product">
            <Link to={`/products/product/${product.id}`}>
              <div className="product-image-container">
                <img src={product.imgUrl} alt={product.name} />
                <button
                  className="add-to-wishlist-btn"
                  onClick={(e) =>
                    handleAddProductToWishList(e, user, product.id)
                  }
                >
                  <i
                    className={`fa-solid fa-heart ${
                      wishListProductsIds.includes(product.id)
                        ? "product-in-wishlist"
                        : ""
                    }`}
                  ></i>
                </button>
              </div>

              <span className="info info--category">
                {fromCategoryToCategoryName[category]}
              </span>

              {product.stockQuantity <= 0 && (
                <span className="info info--out-of-stock">Out of Stock</span>
              )}

              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsByCategory;
