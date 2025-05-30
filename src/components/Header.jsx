import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";
import ToggleSwitch from "./ToggleSwitch";

const Header = () => {
  const [hideOutOfStock, setHideOutOfStock] = useState(false);
  const [isMenuBarActive, setIsMenuBarActive] = useState(false);

  const { user, logout } = useAuth();

  const searchModal = useRef();

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    setIsMenuBarActive(false);
  }, [location]);

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
    }
  };

  const handleSearchProducts = (e) => {
    e.preventDefault();

    try {
      const query = e.target.query.value.trim();

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
      closeSearchModal();
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  };

  const toggleMenuBar = () => {
    setIsMenuBarActive((prev) => !prev);
  };

  const handleDropdownToggle = (e) => {
    const allDetails = document.querySelectorAll(".header .menu-bar details");
    const currentDetails = e.target.closest("details");
    if (!currentDetails) {
      return;
    }

    allDetails.forEach((details) => {
      if (details !== currentDetails) {
        details.removeAttribute("open");
      }
    });
  };

  return (
    <header className="header" id="header">
      <nav className="header-navbar">
        <Logo />
        <div className="search-container">
          <div className="search-bar" onClick={openSearchModal} title="Search">
            <i className="fa-solid fa-search"></i>
            <input
              id="search-bar-input"
              type="search"
              placeholder="Search for products"
              readOnly
            />
          </div>

          <dialog ref={searchModal} className="search-modal">
            <button className="btn btn--3" onClick={closeSearchModal}>
              <i className="fa-solid fa-circle-xmark" title="Close"></i>
            </button>

            <h1>Search</h1>

            <form className="form" onSubmit={(e) => handleSearchProducts(e)}>
              <div className="search-input">
                <button className="btn" type="submit">
                  <i className="fa-solid fa-search" />
                </button>
                <input
                  type="search"
                  id="query"
                  name="query"
                  placeholder="Search..."
                  autoFocus
                />
              </div>

              <div className="actions">
                <details className="advanced-search-filters">
                  <summary className="btn btn--2">
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
                        <option value="" hidden disabled>
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

                <button type="reset" className="btn btn--6">
                  Reset
                </button>
              </div>
            </form>
          </dialog>
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

        <button
          className="menu-bar-btn btn"
          id="menu-bar-btn"
          onClick={toggleMenuBar}
        >
          {isMenuBarActive ? (
            <i className="fa-solid fa-xmark"></i>
          ) : (
            <i className="fa-solid fa-bars"></i>
          )}
        </button>

        <ul
          className={`menu-bar ${isMenuBarActive ? "active" : ""}`}
          onClick={(e) => handleDropdownToggle(e)}
        >
          <li>
            <details>
              <summary>
                Categories <i className="fa-solid fa-circle-chevron-down"></i>
              </summary>
              <ul>
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
            </details>
          </li>
          <li>
            <div className="orders">
              <Link to="/orders">Orders</Link>
            </div>
          </li>
          <li>
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
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
