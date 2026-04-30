import { CheckCircle, Heart, Minus, ShoppingCart, XCircle } from "lucide-react";
import { Link, useNavigate } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import PageTitle from "../components/PageTitle";
import StartShopping from "../components/StartShopping";
import { shoppingCartsMutations } from "../features/mutations/shopping-carts.mutations";
import { shoppingCartsQueries } from "../features/queries/shopping-carts.queries";
import { useAuthStore } from "../store/auth.store";
import { handleError } from "../utils/utils";

const ShoppingCartPage = () => {
  const user = useAuthStore((state) => state.user);

  const navigate = useNavigate();

  const {
    data: shoppingCart,
    isLoading: isLoadingShoppingCart,
    error: shoppingCartError,
  } = shoppingCartsQueries.useGetCartByUserId(user?.id);

  const removeProductFromCartMutation =
    shoppingCartsMutations.useRemoveProductFromCart();
  const clearCartMutation = shoppingCartsMutations.useClearCart();
  const checkoutMutation = shoppingCartsMutations.useCheckout();

  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      clearCartMutation.mutate(user.id);
    }
  };

  const handleCheckout = () => {
    if (confirm("Are you sure you want to proceed to checkout?")) {
      checkoutMutation.mutate(user.id, {
        onSuccess: () => navigate("/orders"),
      });
    }
  };

  if (isLoadingShoppingCart) {
    return <LoadingSpinner />;
  }

  if (shoppingCartError) {
    handleError(shoppingCartError);
    return null;
  }

  return (
    <div>
      <PageTitle title="My Shopping Cart" />

      {shoppingCart?.items?.length > 0 ? (
        <>
          <div className="space-y-4">
            {shoppingCart.items.map((item, i) => (
              <Link
                to={`/products/${item.product.id}`}
                key={item.id}
                title={`View ${item.product.name} details`}
                className="flex justify-between items-center p-4 border-2 border-(--primary-clr)/30 rounded-lg bg-(--primary-clr)/10 shadow-md hover:bg-(--primary-clr)/20 transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs text-(--text-clr-muted)">
                    #{i + 1}
                  </span>
                  <img
                    src={item.product.imgUrl}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="space-y-1.5">
                    <h3 className="font-semibold text-lg text-(--secondary-clr)">
                      {item.product.name}
                    </h3>

                    <div className="flex items-center gap-3 text-sm text-(--text-clr-muted)">
                      <span>
                        Quantity:{" "}
                        <span className="font-medium text-(--text-clr)">
                          {item.quantity}
                        </span>
                      </span>

                      <span className="size-1 bg-(--text-clr-muted) rounded-full" />

                      <span>${item.product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <p className="font-bold text-lg">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    type="button"
                    className="cursor-pointer p-2 text-red-500 hover:bg-(--text-clr)/10 rounded-full group"
                    onClick={(e) => {
                      e.preventDefault();
                      removeProductFromCartMutation.mutate({
                        userId: user?.id,
                        productId: item.product.id,
                      });
                    }}
                    title="Remove from cart"
                  >
                    <Minus className="size-4.5 group-hover:scale-110" />
                  </button>
                </div>
              </Link>
            ))}
          </div>

          <hr className="my-6 border-(--text-clr-muted)/30" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-(--primary-clr)/5 p-6 rounded-xl border border-(--primary-clr)/30">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-semibold">Total:</span>
              <span className="text-3xl font-semibold text-(--secondary-clr) bg-(--secondary-clr)/15 py-2 px-4 rounded-lg">
                ${shoppingCart.totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleClearCart}
                disabled={clearCartMutation.isPending}
                className="cursor-pointer flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-3 px-6 rounded-lg font-bold border-2 border-red-500/20 hover:bg-red-500 hover:text-(--text-clr) active:scale-[97%] disabled:opacity-50"
              >
                <XCircle className="size-5" />
                {clearCartMutation.isPending ? "Clearing..." : "Clear Cart"}
              </button>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={checkoutMutation.isPending}
                className="cursor-pointer flex items-center gap-2 bg-(--primary-clr) py-3 px-6 rounded-lg text-lg hover:brightness-90 active:scale-[97%] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="size-5" />
                {checkoutMutation.isPending ? "Processing..." : "Checkout Now"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <StartShopping
          text="Your shopping cart is empty."
          description="Looks like you haven’t added anything yet. Start exploring our products."
          Icon={ShoppingCart}
          primaryLinkText="Shop Now"
          primaryLinkTo="/"
          secondaryLinkText="View Wish List"
          secondaryLinkTo="/wish-list"
          SecondaryLinkIcon={Heart}
        />
      )}
    </div>
  );
};

export default ShoppingCartPage;
