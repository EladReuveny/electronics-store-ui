import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { wishListsApi } from "../api/wish-lists.api";
import NoResultsFound from "../components/NoResultsFound";
import PageTitle from "../components/PageTitle";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { wishListsKeys } from "../features/keys/wish-lists.keys";
import { wishListsMutations } from "../features/mutations/wish-lists.mutations";
import { productsQueries } from "../features/queries/products.queries";
import { useAuthStore } from "../store/auth.store";
import type { WishList } from "../types/wish-list.types";
import { handleError } from "../utils/utils";

type CategoriesPageProps = {};

const CategoriesPage = ({}: CategoriesPageProps) => {
  const { category } = useParams();

  const mapToCategory = {
    "smart-phones": "SMART_PHONE",
    tablets: "TABLET",
    laptops: "LAPTOP",
    televisions: "TV",
  };

  const mapToCategoryName = {
    "smart-phones": "Smart Phones",
    tablets: "Tablets",
    laptops: "Laptops",
    televisions: "Televisions",
  };

  const user = useAuthStore((state) => state.user);

  const {
    data: products,
    isLoading: isProductsLoading,
    error: productsError,
  } = productsQueries.useGetProductsByCategory(mapToCategory[category]);

  const {
    data: wishListProductsIds,
    isLoading: isWishListProductsIdsLoading,
    error: wishListProductsIdsError,
  } = useQuery({
    queryKey: wishListsKeys.byUserId(user?.id),
    queryFn: () => wishListsApi.getWishListByUserId(user?.id),
    enabled: !!user?.id,
    select: (data: WishList) => data.products.map((p) => p.id),
  });

  const { mutate: addProductToWishListMutation } =
    wishListsMutations.useAddProductToWishList();

  const { mutate: removeProductFromWishListMutation } =
    wishListsMutations.useRemoveProductFromWishList();

  const handleToggleProductInWishList = (productId: number) => {
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
      <PageTitle title={mapToCategoryName[category]} />

      {isLoading ? (
        <div className="h-5 w-24 bg-(--primary-clr)/10 animate-pulse rounded mx-auto" />
      ) : (
        <span className="text-center block text-(--text-clr-muted)">
          {products?.length > 0 ? `${products.length} results` : "No results"}
        </span>
      )}

      {isLoading ? (
        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={`product-card-skeleton-${i}`} />
          ))}
        </div>
      ) : products?.length > 0 ? (
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
            title={`No products in ${mapToCategoryName[category]}`}
            description="We couldn't find any products in this category at the moment. Please check back later."
          />
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
