import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";
import ToggleSwitch from "./ToggleSwitch";

const Header = () => {
  const [hideOutOfStock, setHideOutOfStock] = useState(false);

  const { user, logout } = useAuth();

  const searchModal = useRef();

  const navigate = useNavigate();

  const openSearchModal = () => {
    if (searchModal.current) {
      searchModal.current.showModal();
      const searchInput = searchModal.current.querySelector("input#query");
      searchInput.focus();
    }
  };

  const closeSearchModal = () => {
    if (searchModal.current) {
      searchModal.current.close();
      setProducts([]);
    }
  };

  const handleSearchProducts = (e) => {
    e.preventDefault();

    try {
      const query = e.target.query.value.trim();

      if (!query) {
        console.warn("Search query is empty.");
        return;
      }

      const sortBySelectVal = e.target["sort-by"].value;
      const isHideOutOfStockCheckboxChecked =
        e.target["hide-out-of-stock"].checked;

      navigate(
        `/products?query=${query}` +
          (sortBySelectVal
            ? `&sort=${sortBySelectVal === "ascending-order" ? "asc" : "desc"}`
            : "") +
          (isHideOutOfStockCheckboxChecked ? `&hideOutOfStock=true` : "")
      );
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
            <button className="btn btn--3" onClick={closeSearchModal}>
              <i className="fa-solid fa-circle-xmark" title="Close"></i>
            </button>

            <h1>Search</h1>

            <form className="form" onSubmit={(e) => handleSearchProducts(e)}>
              <div className="search-input">
                <input
                  type="search"
                  id="query"
                  name="query"
                  placeholder="Search..."
                  autoFocus
                />

                <button className="btn" type="submit">
                  <i className="fa-solid fa-search" />
                </button>
              </div>

              <details className="advanced-search-filters">
                <summary className="btn btn--4">
                  <span className="material-symbols-outlined">tune</span>
                  Filters
                </summary>

                <div className="filters">
                  <div className="sort-by-filter">
                    <label htmlFor="sort-by">Sort by (price):</label>
                    <select
                      id="sort-by"
                      name="sort-by"
                      className="btn btn--1"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        --- Select an order ---
                      </option>
                      <option value="ascending-order">Low to high</option>
                      <option value="descending-order">High to low</option>
                    </select>
                  </div>

                  <div className="out-of-stock-filter">
                    <ToggleSwitch
                      id={"hide-out-of-stock"}
                      text={"Hide out of stock: "}
                      isChecked={hideOutOfStock}
                      onChange={(e) => setHideOutOfStock(e.target.checked)}
                    />
                  </div>
                </div>
              </details>
            </form>
          </dialog>
        </div>

        <div className="categories">
          Categories
          <ul className="categories-list">
            <li>
              <Link to="/products/category/smart_phones">Smart Phones</Link>
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
              Logout<i className="fa-solid fa-right-from-bracket"></i>
            </Link>
          ) : (
            <Link to="/login" className="btn btn--4">
              Login<i className="fa-solid fa-right-to-bracket"></i>
            </Link>
          )}
          <Link to="/register" className="btn btn--1">
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
