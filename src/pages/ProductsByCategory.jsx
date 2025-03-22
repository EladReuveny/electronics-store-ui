import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductsByCategory } from "../api requests/product api's/product";

const ProductsByCategory = () => {
  const [products, setProducts] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryName, setCategoryName] = useState("");
  let { category } = useParams();

  useEffect(() => {
    const mappingCategory = () => {
      switch (category) {
        case "smart-phones":
          setCategoryTitle("Smart Phones");
          setCategoryName("SMART_PHONE");
          return;
        case "tablets":
          setCategoryTitle("Tablets");
          setCategoryName("TABLET");
          return;
        case "laptops":
          setCategoryTitle("Laptops");
          setCategoryName("LAPTOP");
          return;
        default:
          setCategoryTitle("TV's");
          setCategoryName("TV");
      }
    };

    mappingCategory();
  }, [category]);

  // Fetch products based on the category from an API
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const productsData = await getProductsByCategory(categoryName);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsByCategory();
  }, [categoryName]);

  return (
    <section className="products-categories">
      <div className="section-title">
        <h1>{categoryTitle}</h1>
      </div>

      <div className="products-categories-container">
        {products.map((product) => (
          <div key={product.id} className="product">
            <Link to={`/products/product/${product.id}`}>
              <img src={product.imgUrl} alt={product.name} />
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsByCategory;
