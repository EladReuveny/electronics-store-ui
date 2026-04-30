import { Check, Heart, ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import type { Product } from "../types/product.types";

type ProductCardProps = {
  product: Product;
  selectedProductsIds?: number[];
  toggleProductSelection?: () => void;
  isInWishList?: boolean;
  onToggleProductInWishList?: () => void;
  onMoveToShoppingCart?: () => void;
};

const ProductCard = ({
  product,
  selectedProductsIds,
  toggleProductSelection,
  isInWishList,
  onToggleProductInWishList,
  onMoveToShoppingCart,
}: ProductCardProps) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className="relative shadow-[0_0_15px_0_var(--primary-clr)] bg-(--primary-clr)/15 rounded-lg hover:shadow-[0_0_25px_5px_var(--primary-clr)] hover:scale-102"
    >
      {selectedProductsIds && toggleProductSelection && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleProductSelection();
          }}
          className={`absolute top-0 right-0 size-4 rounded-full cursor-pointer border-2 border-(--text-clr) flex items-center justify-center hover:scale-105 
          ${
            selectedProductsIds?.includes(product.id)
              ? "bg-(--text-clr) text-(--bg-clr)"
              : "bg-transparent text-(--text-clr)"
          }`}
        >
          {selectedProductsIds?.includes(product.id) && <Check />}
        </button>
      )}

      <div>
        <img
          src={product.imgUrl}
          alt={product.name}
          className="w-full h-48 rounded-t-lg object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-(--secondary-clr)">
            {product.name}
          </h3>
          <span className="bg-(--secondary-clr)/15 text-(--secondary-clr) font-bold py-1 px-2 rounded-md text-center">
            {product.category
              .split("_")
              .map(
                (word) => word[0].toUpperCase() + word.slice(1).toLowerCase(),
              )
              .join(" ")}
          </span>
          <span className="italic">${product.price.toFixed(2)}</span>{" "}
          <p className="text-(--text-clr-muted)">
            {product.description.slice(0, 50)}...
          </p>
        </div>

        {onMoveToShoppingCart && (
          <button
            type="button"
            className="mt-4 cursor-pointer py-2 px-4 bg-(--text-clr) text-(--primary-clr) rounded-lg flex items-center gap-2 hover:brightness-90 active:scale-[97%]"
            onClick={(e) => {
              e.preventDefault();
              onMoveToShoppingCart();
            }}
          >
            Move To Cart <ShoppingCart className="size-4" />
          </button>
        )}
      </div>

      <button
        type="button"
        title={isInWishList ? "Remove from wish list" : "Add to wish list"}
        className="cursor-pointer absolute bottom-1 right-1 bg-(--primary-clr)/50 backdrop-blur-md p-2 rounded-full hover:scale-110 hover:bg-(--primary-clr)"
        onClick={(e) => {
          e.preventDefault();
          onToggleProductInWishList();
        }}
      >
        <Heart
          className={`size-4 ${isInWishList ? "fill-(--secondary-clr) text-(--secondary-clr)" : ""}`}
        />
      </button>
    </Link>
  );
};

export default React.memo(ProductCard);
