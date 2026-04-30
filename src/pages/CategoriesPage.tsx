import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { wishListsApi } from "../api/wish-lists.api";
import NoResultsFound from "../components/NoResultsFound";
import PageTitle from "../components/PageTitle";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { wishListsKeys } from "../features/keys/wish-lists.keys";
import { wishListsMutations } from "../features/mutations/wish-lists.mutations";
import { productsQueries } from "../features/queries/products.queries";
import { useAuthStore } from "../store/auth.store";
import type { Category } from "../types/product.types";
import type { WishList } from "../types/wish-list.types";
import { handleError } from "../utils/utils";

type CategoriesPageProps = {};

const CategoriesPage = ({}: CategoriesPageProps) => {
  type CategoryParam = "smart-phones" | "tablets" | "laptops" | "televisions";

  const { category } = useParams<{
    category: CategoryParam;
  }>();

  const mapToCategory: Record<CategoryParam, Category> = {
    "smart-phones": "SMART_PHONE",
    tablets: "TABLET",
    laptops: "LAPTOP",
    televisions: "TV",
  };

  const mapToCategoryName: Record<CategoryParam, string> = {
    "smart-phones": "Smart Phones",
    tablets: "Tablets",
    laptops: "Laptops",
    televisions: "Televisions",
  };

  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const {
    data: products,
    isLoading: isProductsLoading,
    error: productsError,
  } = productsQueries.useGetProductsByCategory(
    mapToCategory[category as CategoryParam],
  );

  const {
    data: wishListProductsIds,
    isLoading: isWishListProductsIdsLoading,
    error: wishListProductsIdsError,
  } = useQuery({
    queryKey: wishListsKeys.byUserId(user?.id as number),
    queryFn: () => wishListsApi.getWishListByUserId(user?.id as number),
    enabled: !!user?.id,
    select: (data: WishList) => data.products.map((p) => p.id),
  });

  const { mutate: addProductToWishListMutation } =
    wishListsMutations.useAddProductToWishList();

  const { mutate: removeProductFromWishListMutation } =
    wishListsMutations.useRemoveProductFromWishList();

  const handleToggleProductInWishList = (productId: number) => {
    if (!user) {
      toast.info("You need to be logged in to manage your wish list");
      navigate("/login", { state: { from: location } });
      return;
    }

    if (wishListProductsIds?.includes(productId)) {
      removeProductFromWishListMutation({ userId: user?.id, productId });
    } else {
      addProductToWishListMutation({ userId: user?.id, productId });
    }
  };

  const isLoading = isProductsLoading || isWishListProductsIdsLoading;

  if (productsError || wishListProductsIdsError) {
    handleError(productsError || wishListProductsIdsError);
    return null;
  }

  return (
    <div>
      <PageTitle title={mapToCategoryName[category as CategoryParam]} />

      {isLoading ? (
        <div className="h-5 w-24 bg-(--primary-clr)/10 animate-pulse rounded mx-auto" />
      ) : (
        <span className="text-center block text-(--text-clr-muted)">
          {(products?.length ?? 0) > 0
            ? `${products?.length} results`
            : "No results"}
        </span>
      )}

      {isLoading ? (
        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={`product-card-skeleton-${i}`} />
          ))}
        </div>
      ) : (products?.length ?? 0) > 0 ? (
        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isInWishList={wishListProductsIds?.includes(product.id)}
              onToggleProductInWishList={() =>
                handleToggleProductInWishList(product.id)
              }
            />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <NoResultsFound
            title={`No products in ${mapToCategoryName[category as CategoryParam]}`}
            description="We couldn't find any products in this category at the moment. Please check back later."
          />
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
