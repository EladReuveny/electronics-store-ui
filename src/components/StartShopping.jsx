import React from "react";
import { Link } from "react-router-dom";

const StartShopping = ({ text, text2 = "" }) => {
  return (
    <div className="start-shopping">
      <p>{text}</p>
      {text2 && (
        <Link to="/wishlist" className="btn btn--4">
          {text2}
          <i className="fa-solid fa-heart"></i>
        </Link>
      )}
      <Link to="/products" className="btn btn--2">
        Shop Now
        <i className="fa-solid fa-cart-shopping"></i>
      </Link>
    </div>
  );
};

export default StartShopping;
