import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  addProduct,
  getAllProducts,
} from "../api requests/product api's/product";
import { AuthContext } from "../context/AuthContext";
import {
  addProductToWishList,
  getWishList,
  removeProductFromWishList,
} from "../api requests/wishList api's/wishList";
import { addProductToCart } from "../api requests/shoppingCart api's/shoppingCart";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [wishListProductsIds, setWishListProductsIds] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const categoryNames = {
    SMART_PHONE: "Smart Phone",
    TABLET: "Tablet",
    LAPTOP: "Laptop",
    TV: "TV",
  };

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const userRole = user?.role;

  const modalRef = useRef();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const productData = await getAllProducts();
        setProducts(productData);

        if (user) {
          const wishlistData = await getWishList(user.id);
          setWishListProductsIds(
            wishlistData.products.map((product) => product.id)
          );
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAllProducts();
  }, []);

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
        setWishListProductsIds((wishListProductsIds) =>
          [...wishListProductsIds].filter((id) => id !== productId)
        );
      } else {
        updatedWishListData = await addProductToWishList(user.id, productId);
        setWishListProductsIds((wishListProductsIds) => [
          ...wishListProductsIds,
          productId,
        ]);
      }
    } catch (error) {
      console.error("Error adding/removing product from wishlist:", error);
    }
  };

  const handleAddProductToCart = async (user, productId, quantity) => {
    if (!user) {
      alert("Please log in first.");
      navigate("/login");
    }

    try {
      const updatedCart = await addProductToCart(user.id, productId, quantity);
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding product to cart");
    }
  };

  const openAddProductModal = () => {
    modalRef.current.showModal();
  };

  const closeAddProductModal = () => {
    modalRef.current.close();
  };

  const handleAddProductSubmit = async (event) => {
    event.preventDefault();

    const product = {
      name: event.target.name.value,
      description: event.target.description.value,
      price: event.target.price.value,
      imgUrl: event.target.imgUrl.value,
      stockQuantity: event.target.stockQuantity.value,
      category: event.target.category.value,
    };

    try {
      const createdProduct = await addProduct(product);
      setProducts((products) => [...products, createdProduct]);
      alert("Product added successfully!");
      event.target.reset();
      closeAddProductModal();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <section className="products" id="products">
      <div className="section__title">
        <h1>Products</h1>
      </div>

      <div className="products__add-product">
        {userRole === "ADMIN" && (
          <button
            className="btn btn--primary"
            onClick={() => openAddProductModal()}
          >
            <i className="fa-solid fa-plus"></i> Add Product
          </button>
        )}
      </div>

      <dialog ref={modalRef} className="products__add-product-dialog">
        <h1>Add New Product</h1>
        <button className="close-btn" onClick={closeAddProductModal}>
          <i className="fa-solid fa-times"></i>
        </button>
        <form onSubmit={handleAddProductSubmit}>
          <fieldset>
            <legend>Product Details</legend>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description"></textarea>
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" required />
            <label htmlFor="imgUrl">Image URL:</label>
            <input type="url" id="imgUrl" name="imgUrl" required />
            <label htmlFor="stockQuantity">Stock Quantity:</label>
            <input
              type="number"
              id="stockQuantity"
              name="stockQuantity"
              required
            />
            <label htmlFor="category">Category:</label>
            <select id="category" name="category" required>
              <option value="SMART_PHONE">Smart Phone</option>
              <option value="TABLET">Tablet</option>
              <option value="LAPTOP">Laptop</option>
              <option value="TV">TV</option>
            </select>
            <button type="reset">Reset</button>
            <button type="submit">
              <i className="fa-solid fa-plus"></i>
              Add Product
            </button>
          </fieldset>
        </form>
      </dialog>

      <p className="products__items-found">
        <b>{products.length}</b> Items Found
      </p>

      <div className="products__container">
        {products.map((product) => (
          <div key={product.id} className="product">
            <Link to={`/products/product/${product.id}`}>
              <div className="product__image-container">
                <img src={product.imgUrl} alt={product.name} />
                <button
                  className="add-to-wishlist-btn"
                  onClick={(e) =>
                    handleAddProductToWishList(e, user, product.id)
                  }
                >
                  <i
                    className={`fa-solid fa-heart ${
                      wishListProductsIds.includes(product.id) &&
                      "product-in-wishlist"
                    }`}
                  ></i>
                </button>
              </div>

              <span className="info">{categoryNames[product.category]}</span>
              {product.stockQuantity <= 0 && (
                <span className="info--out-of-stock">Out of Stock</span>
              )}
              <h2 className="product__name">{product.name}</h2>
              <p className="product__price">${product.price}</p>
            </Link>

            {/* <div className="product__add-to">
              <button
                className="add-to-wishlist"
                onClick={() => handleAddProductToWishList(user, product.id)}
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
                onClick={() =>
                  handleAddProductToCart(user, product.id, quantity)
                }
              >
                <i className="fa-solid fa-shopping-cart"></i>
                Add to Cart
              </button>
            </div> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
