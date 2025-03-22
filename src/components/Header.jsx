import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logo from "./Logo";

const Header = () => {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const { user, logout } = useContext(AuthContext);

  const searchModal = useRef();
  const searchInput = useRef();
  const sortBySelect = useRef();
  const outOfStockCheckbox = useRef();

  const openSearchModal = () => {
    if (searchModal.current) {
      searchModal.current.showModal();
      searchInput.current.focus();
    }
  };

  const closeSearchModal = () => {
    if (searchModal.current) {
      searchModal.current.close();
      setSearchValue("");
      setProducts([]);
    }
  };

  const searchProduct = async () => {
    try {
      const query = searchValue.trim();
      if (!query) {
        console.warn("Search query is empty.");
        setProducts([]);
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/api/v1/products/search?query=${query}`
      );

      let filteredProducts = response.data;

      const sortBySelectVal = sortBySelect.current.value;

      if (sortBySelectVal) {
        filteredProducts = [...filteredProducts].sort((a, b) =>
          sortBySelectVal === "ascending-order"
            ? a.price - b.price
            : b.price - a.price
        );
      }

      if (outOfStockCheckbox.current.checked) {
        filteredProducts = filteredProducts.filter(
          (product) => product.stockQuantity > 0
        );
      }

      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  };

  return (
    <header className="header" id="header">
      <nav className="header-navbar">
        <Logo />
        <div className="search-container">
          <div className="search-bar" onClick={openSearchModal} title="Search">
            <input
              id="search-bar-input"
              type="search"
              placeholder="Search for products"
              readOnly
            />
            <i className="fa-solid fa-search"></i>
          </div>

          <dialog ref={searchModal} className="search-modal">
            <h1>Search for a product</h1>
            <button className="btn btn--close" onClick={closeSearchModal}>
              <i className="fa-solid fa-times"></i>
            </button>
            <input
              id="search-input"
              type="text"
              ref={searchInput}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchProduct();
                }
              }}
              placeholder="Type to search for a product"
              autoFocus
            />
            <button className="search-btn" onClick={searchProduct}>
              Search
            </button>
            <details className="advanced-search-filters">
              <summary>Advanced Search Filters</summary>
              <div className="filters">
                <div className="filters-sort-by">
                  <label htmlFor="sort-by">Sort by (price):</label>
                  <select
                    ref={sortBySelect}
                    name="sort-by"
                    id="sort-by"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      --- Select an order ---
                    </option>
                    <option value="ascending-order">Low to high</option>
                    <option value="descending-order">High to low</option>
                  </select>
                </div>

                <div className="filters-out-of-stock">
                  <label htmlFor="out-of-stock">Hide out of stock</label>
                  <input
                    ref={outOfStockCheckbox}
                    type="checkbox"
                    id="out-of-stock"
                    name="out-of-stock"
                  />
                </div>
              </div>
            </details>

            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="product">
                  <Link to={`/products/product/${product.id}`}>
                    <img src={product.imgUrl} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>Price: ${product.price}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </dialog>
        </div>

        <div className="categories">
          Categories
          <ul className="categories-list">
            <li>
              <Link to="/products/category/smart-phones">Smart Phones</Link>
            </li>
            <li>
              <Link to="/products/category/tablets">Tablets</Link>
            </li>
            <li>
              <Link to="/products/category/laptops">Laptops</Link>
            </li>
            <li>
              <Link to="/products/category/tvs">TVs</Link>
            </li>
          </ul>
        </div>

        <div className="orders">
          <Link to="/orders">Orders</Link>
        </div>

        <div className="profile">
          <Link to="/profile">
            <i className="fa-solid fa-user"></i>
          </Link>
        </div>

        <div className="wishlist">
          <Link to="/wishlist">
            <i className="fa-solid fa-heart"></i>
          </Link>
        </div>

        <div className="shopping-cart">
          <Link to="/shopping-cart">
            <i className="fa-solid fa-shopping-cart"></i>
          </Link>
        </div>

        <div className="auth">
          {user ? (
            <Link to="/login" onClick={logout} className="btn btn--4">
              Logout
            </Link>
          ) : (
            <Link to="/login" className="btn btn--4">Login</Link>
          )}
          <Link to="/register" className="btn btn--1">Register</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
