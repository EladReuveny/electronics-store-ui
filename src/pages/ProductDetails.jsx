import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  updateProduct,
} from "../api requests/product api's/product";
import {
  addProductToWishList,
  getWishList,
  removeProductFromWishList,
} from "../api requests/wishList api's/wishList";
import { addProductToCart } from "../api requests/shoppingCart api's/shoppingCart";
import useAuth from "../hooks/useAuth";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [wishListProductsIds, setWishListProductsIds] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const { user } = useAuth();

  const { productId } = useParams();

  const navigate = useNavigate();

  const modalRef = useRef();

  const userRole = user?.role;

  const categoryNames = {
    SMART_PHONE: "Smart Phone",
    TABLET: "Tablet",
    LAPTOP: "Laptop",
    TV: "TV",
  };

  useEffect(() => {
    const fetchProductById = async (productId) => {
      try {
        const productData = await getProductById(productId);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product: ", error);
      }

      if (user) {
        const wishlistData = await getWishList(user.id);
        setWishListProductsIds(
          wishlistData.products.map((product) => product.id)
        );
      }
    };

    fetchProductById(productId);
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

  const handleAddProductToCart = async (user, productId, quantity) => {
    if (!user) {
      alert("Please log in first.");
      navigate("/login");
      return;
    }

    if (quantity < 1) {
      alert("Quantity must be a positive integer.");
      return;
    }

    try {
      const updatedCart = await addProductToCart(user.id, productId, quantity);
      alert("Successfully has been added!");
    } catch (error) {
      alert(error);
      console.error("Error adding product to cart", error);
    }
  };

  const openEditProductModal = () => {
    modalRef.current.showModal();
  };

  const closeEditProductModal = () => {
    modalRef.current.close();
  };

  const handleEditProductSubmit = async (event) => {
    event.preventDefault();

    const productUpdateDTO = {
      name: event.target.name.value.trim(),
      description: event.target.description.value.trim(),
      price: event.target.price.value.trim(),
      imgUrl: event.target.imgUrl.value.trim(),
      stockQuantity: event.target.stockQuantity.value.trim(),
      category: event.target.category.value.trim() || null,
    };

    try {
      const updatedProduct = await updateProduct(productId, productUpdateDTO);
      setProduct(updatedProduct);
      alert("Product has been updated successfully!");
      event.target.reset();
      closeEditProductModal();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className="product" id="product">
      <div className="section-title">
        <h1>Product Details</h1>
      </div>

      {userRole === "ADMIN" && (
        <div className="admin-actions">
          <button className="btn btn--2" onClick={() => openEditProductModal()}>
            Edit Product <i className="fa-solid fa-pen"></i>
          </button>
        </div>
      )}

      <dialog ref={modalRef} className="products-edit-product-dialog">
        <button className="btn btn--3" onClick={closeEditProductModal}>
          <i className="fa-solid fa-circle-xmark" title="Close"></i>
        </button>

        <h1>Edit Product</h1>

        <form className="form" onSubmit={(e) => handleEditProductSubmit(e)}>
          <fieldset className="fieldset">
            <legend>Product Details</legend>

            <div className="field">
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={product.name}
                placeholder=""
                autoFocus
                required
              />
              <label htmlFor="name">
                Name <span className="required-field-mark">*</span>
              </label>
            </div>

            <div className="field">
              <textarea
                id="description"
                name="description"
                defaultValue={product.description}
                placeholder=""
              ></textarea>
              <label htmlFor="description">Description</label>
            </div>

            <div className="field">
              <input
                type="number"
                id="price"
                name="price"
                defaultValue={product.price}
                placeholder=""
                required
              />
              <label htmlFor="price">
                Price <span className="required-field-mark">*</span>
              </label>
            </div>

            <div className="field">
              <input
                type="url"
                id="imgUrl"
                name="imgUrl"
                defaultValue={product.imgUrl}
                placeholder=""
              />
              <label htmlFor="imgUrl">
                Image URL <span className="required-field-mark">*</span>
              </label>
            </div>

            <div className="field">
              <input
                type="number"
                id="stockQuantity"
                name="stockQuantity"
                defaultValue={product.stockQuantity}
                placeholder=""
                required
              />
              <label htmlFor="stockQuantity">
                Stock Quantity <span className="required-field-mark">*</span>
              </label>
            </div>

            <div className="field">
              <span htmlFor="category">
                Category: <span className="required-field-mark">*</span>
              </span>
              <select
                id="category"
                name="category"
                className="btn btn--1"
                value={product.category}
                onChange={(e) =>
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    category: e.target.value,
                  }))
                }
                required
              >
                <option value="" hidden disabled>
                  --- Select a category ---
                </option>
                <option value="SMART_PHONE">Smart Phone</option>
                <option value="TABLET">Tablet</option>
                <option value="LAPTOP">Laptop</option>
                <option value="TV">TV</option>
              </select>
            </div>

            <div className="actions">
              <button type="reset" className="btn btn--6">
                Reset
              </button>

              <button type="submit" className="btn btn--2">
                Save Changes
                <i className="fa-solid fa-pen"></i>
              </button>
            </div>
          </fieldset>
        </form>
      </dialog>

      <div className="product-details-container">
        <div className="product-image-container">
          <img src={product.imgUrl} alt={product.name} />
          <button
            className="add-to-wishlist-btn"
            onClick={(e) => handleAddProductToWishList(e, user, product.id)}
          >
            <i
              className={`fa-solid fa-heart ${
                wishListProductsIds.includes(product.id)
                  ? "product-in-wishlist"
                  : ""
              }`}
            ></i>
          </button>
          <span className="info info--category">
            {categoryNames[product.category]}
          </span>
        </div>

        <div className="product-details-content">
          <div className="product-header">
            <h2 className="product-name">{product.name}</h2>
            {product.stockQuantity > 0 ? (
              <span className="info info--in-stock">
                {product.stockQuantity} in stock
              </span>
            ) : (
              <span className="info info--out-of-stock">Out of Stock</span>
            )}
          </div>

          <div className="product-details">
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description}</p>
          </div>

          <div className="quantity">
            <label htmlFor="quantity">Quantity: </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                handleAddProductToCart(user, product.id, quantity)
              }
            />
          </div>
          <button
            className="btn btn--2"
            onClick={() => handleAddProductToCart(user, product.id, quantity)}
          >
            Add to Cart<i className="fa-solid fa-shopping-cart"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
