import { Heart, ShoppingCart, XCircle } from "lucide-react";
import { useNavigate } from "react-router";
import PageTitle from "../components/PageTitle";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import StartShopping from "../components/StartShopping";
import { wishListsMutations } from "../features/mutations/wish-lists.mutations";
import { wishListsQueries } from "../features/queries/wish-lists.queries";
import { useAuthStore } from "../store/auth.store";
import type { Product } from "../types/product.types";
import { handleError } from "../utils/utils";

const WishListPage = () => {
  const user = useAuthStore((state) => state.user)!;

  const navigate = useNavigate();

  const {
    data: wishlist,
    isLoading: isWishListLoading,
    error: wishListError,
  } = wishListsQueries.useGetWishListByUserId(user?.id);

  const clearWishListMutation = wishListsMutations.useClearWishList();

  const moveToShoppingCartMutation = wishListsMutations.useMoveToShoppingCart();

  const removeProductFromWishListMutation =
    wishListsMutations.useRemoveProductFromWishList();

  const handleMoveToShoppingCart = (productId: number) => {
    const quantity = prompt("Enter quantity", "1");

    if (!quantity) return;

    moveToShoppingCartMutation.mutate(
      {
        userId: user?.id,
        productId,
        quantity: !isNaN(Number(quantity)) ? Number(quantity) : 1,
      },
      {
        onSuccess: () => navigate("/shopping-cart"),
      },
    );
  };

  if (wishListError) {
    handleError(wishListError);
    return;
  }

  return (
    <div>
      <PageTitle title="My Wish List" />

      {isWishListLoading ? (
        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={`wishlist-skeleton-${i}`} />
          ))}
        </div>
      ) : (wishlist?.products?.length ?? 0) > 0 ? (
        <>
          <p className="my-4 text-(--text-clr-muted) text-center">
            {wishlist?.products?.length ?? 0} products saved in your wish list.
          </p>

          <button
            type="button"
            className="ml-auto cursor-pointer flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-3 px-8 rounded-xl font-bold border-2 border-red-500/20 hover:bg-red-500 hover:text-(--text-clr) active:scale-[97%] disabled:opacity-50"
            onClick={() => clearWishListMutation.mutate(user?.id)}
          >
            <XCircle className="size-4" />
            Clear Wish List
          </button>

          <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
            {wishlist?.products.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                isInWishList={true}
                onToggleProductInWishList={() =>
                  removeProductFromWishListMutation.mutate({
                    userId: user?.id as number,
                    productId: product.id,
                  })
                }
                onMoveToShoppingCart={() =>
                  handleMoveToShoppingCart(product.id)
                }
              />
            ))}
          </div>
        </>
      ) : (
        <StartShopping
          text="Your wish list is empty."
          description="Save products you love so you can find them easily later."
          Icon={Heart}
          primaryLinkText="Browse Products"
          primaryLinkTo="/"
          secondaryLinkText="Go to Cart"
          secondaryLinkTo="/shopping-cart"
          SecondaryLinkIcon={ShoppingCart}
        />
      )}
    </div>
  );
};

export default WishListPage;
