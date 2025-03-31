import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  addProduct,
  getAllProducts,
  searchProductsByName,
} from "../api requests/product api's/product";
import {
  addProductToWishList,
  getWishList,
  removeProductFromWishList,
} from "../api requests/wishList api's/wishList";
import useAuth from "../hooks/useAuth";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [wishListProductsIds, setWishListProductsIds] = useState([]);

  const { user } = useAuth();

  const navigate = useNavigate();

  const modalRef = useRef();

  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");
  const sortBy = searchParams.get("sort");
  const hideOutOfStock = searchParams.get("hideOutOfStock");

  const userRole = user?.role;

  const categoryNames = {
    SMART_PHONE: "Smart Phone",
    TABLET: "Tablet",
    LAPTOP: "Laptop",
    TV: "TV",
  };

  useEffect(() => {
    const handleSearchProducts = async () => {
      try {
        let searchResults = await searchProductsByName(query);

        if (sortBy) {
          searchResults = [...searchResults].sort((a, b) =>
            sortBy === "asc" ? a.price - b.price : b.price - a.price
          );
        }

        if (hideOutOfStock) {
          searchResults = [...searchResults].filter(
            (product) => product.stockQuantity > 0
          );
        }

        setProducts(searchResults);
      } catch (error) {
        console.error("Error searching products:", error);
      }
    };

    const fetchAllProducts = async () => {
      try {
        const productData = await getAllProducts();
        setProducts(productData);

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

    if (query) {
      handleSearchProducts();
    } else {
      fetchAllProducts();
    }
  }, [query, sortBy, hideOutOfStock]);

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
      setProducts((prevProducts) => [...prevProducts, createdProduct]);
      alert("Product added successfully!");
      event.target.reset();
      closeAddProductModal();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <section className="products" id="products">
      <div className="section-title">
        <h1>Products</h1>
      </div>

      <dialog ref={modalRef} className="products-add-product-dialog">
        <button className="btn btn--3" onClick={closeAddProductModal}>
          <i className="fa-solid fa-circle-xmark" title="Close"></i>
        </button>

        <h1>Add new Product</h1>

        <form className="form" onSubmit={handleAddProductSubmit}>
          <fieldset className="fieldset">
            <legend>Product Details</legend>

            <div className="field">
              <input
                type="text"
                id="name"
                name="name"
                placeholder=""
                required
                autoFocus
              />
              <label htmlFor="name">Name</label>
            </div>

            <div className="field">
              <textarea
                id="description"
                name="description"
                placeholder=""
              ></textarea>
              <label htmlFor="description">Description</label>
            </div>

            <div className="field">
              <input
                type="number"
                id="price"
                name="price"
                placeholder=""
                required
              />
              <label htmlFor="price">Price</label>
            </div>

            <div className="field">
              <input
                type="url"
                id="imgUrl"
                name="imgUrl"
                placeholder=""
                required
              />
              <label htmlFor="imgUrl">Image URL</label>
            </div>

            <div className="field">
              <input
                type="number"
                id="stockQuantity"
                name="stockQuantity"
                placeholder=""
                required
              />
              <label htmlFor="stockQuantity">Stock Quantity</label>
            </div>

            <div className="field">
              <span htmlFor="category">Category:</span>
              <select
                id="category"
                name="category"
                className="btn btn--1"
                defaultValue=""
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
                Add Product
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </fieldset>
        </form>
      </dialog>

      <p className="products-items-found">{products.length} Products found</p>

      <div className="products-add-product">
        {userRole === "ADMIN" && (
          <button className="btn btn--2" onClick={() => openAddProductModal()}>
            Add Product <i className="fa-solid fa-plus"></i>
          </button>
        )}
      </div>

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
                {categoryNames[product.category]}
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

export default Products;
