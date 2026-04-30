import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { FileText, Plus, Save, Trash, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { z } from "zod";
import { wishListsApi } from "../api/wish-lists.api";
import FormField from "../components/FormField";
import NoResultsFound from "../components/NoResultsFound";
import PageTitle from "../components/PageTitle";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { wishListsKeys } from "../features/keys/wish-lists.keys";
import { productsMutations } from "../features/mutations/products.mutations";
import { wishListsMutations } from "../features/mutations/wish-lists.mutations";
import { productsQueries } from "../features/queries/products.queries";
import { useAuthStore } from "../store/auth.store";
import type { Category, Product } from "../types/product.types";
import type { WishList } from "../types/wish-list.types";
import { handleError } from "../utils/utils";

const addProductSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  description: z.string().min(5, "Description is too short"),
  price: z.number().min(0, "Price must be positive"),
  imgUrl: z.url("Invalid URL"),
  stockQuantity: z.number().min(0),
  category: z.enum(["SMART_PHONE", "TABLET", "LAPTOP", "TV"]),
});

type ProductsPageProps = {};

const ProductsPage = ({}: ProductsPageProps) => {
  const user = useAuthStore((state) => state.user);

  const [searchParams] = useSearchParams();

  const q = searchParams.get("q");
  const sortBy = searchParams.get("sortBy");
  const hideOutOfStock = searchParams.get("hideOutOfStock");

  const addProductDialog = useRef<HTMLDialogElement | null>(null);

  const {
    data: products,
    isLoading: isProductsLoading,
    error: productsError,
  } = productsQueries.useGetAllProducts();

  const {
    data: searchedProducts,
    isLoading: isSearchedProductsLoading,
    error: searchedProductsError,
  } = productsQueries.useSearchProductsByName(q);

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

  const { mutate: removeSelectedProductsMutation } =
    productsMutations.useRemoveSelectedProducts();

  const { mutate: addProductMutation } = productsMutations.useAddProduct();

  const [selectedProductsIds, setSelectedProductsIds] = useState<number[]>([]);

  const filteredAndSortedProducts = useMemo(() => {
    let results = searchedProducts || products || [];

    if (sortBy === "price-asc") {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      results.sort((a, b) => b.price - a.price);
    }

    if (hideOutOfStock) {
      results = results.filter((p) => p.stockQuantity > 0);
    }

    return results;
  }, [products, searchedProducts, sortBy, hideOutOfStock]);

  const toggleProductSelection = (productId: number) => {
    if (selectedProductsIds.includes(productId)) {
      setSelectedProductsIds((prev) => prev.filter((id) => id !== productId));
    } else {
      setSelectedProductsIds((prev) => [...prev, productId]);
    }
  };

  const handleToggleProductInWishList = (productId: number) => {
    if (wishListProductsIds?.includes(productId)) {
      removeProductFromWishListMutation({ userId: user?.id, productId });
    } else {
      addProductToWishListMutation({ userId: user?.id, productId });
    }
  };

  const addProductForm = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      imgUrl: "",
      stockQuantity: 0,
      category: "SMART_PHONE" as Category,
    },
    validators: {
      onChange: addProductSchema,
      onBlur: addProductSchema,
      onSubmit: addProductSchema,
    },
    onSubmit: ({ value }) => {
      addProductMutation(value as Product, {
        onSuccess: () => {
          addProductDialog.current?.close();
          addProductForm.reset();
        },
      });
    },
  });

  const isLoading =
    isProductsLoading ||
    isSearchedProductsLoading ||
    isWishListProductsIdsLoading;

  if (productsError || searchedProductsError || wishListProductsIdsError) {
    handleError(
      productsError || searchedProductsError || wishListProductsIdsError,
    );
    return null;
  }

  return (
    <div className="space-y-6">
      <PageTitle title="Products" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <span className="text-(--text-clr-muted) font-medium">
          {isLoading ? (
            <div className="h-6 w-32 bg-(--primary-clr)/10 animate-pulse rounded" />
          ) : (
            `${filteredAndSortedProducts?.length} results found ${q ? `for "${q}"` : ""}`
          )}
        </span>

        {user?.role === "ADMIN" && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={selectedProductsIds.length === 0}
              className="cursor-pointer flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-2.5 px-6 rounded-xl font-bold border-2 border-red-500/20 hover:bg-red-500 active:scale-[97%] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                if (
                  confirm(
                    `Are you sure you want to remove ${selectedProductsIds.length} products?`,
                  )
                ) {
                  removeSelectedProductsMutation(selectedProductsIds);
                  setSelectedProductsIds([]);
                }
              }}
            >
              <Trash className="size-5" />
              Remove Selected
            </button>
            <button
              type="button"
              className="cursor-pointer flex items-center gap-2 bg-(--primary-clr) py-2.5 px-6 rounded-xl font-bold hover:brightness-110 active:scale-[97%] shadow-lg"
              onClick={() => addProductDialog.current?.showModal()}
            >
              Add Product
              <Plus className="size-5" />
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={`product-skeleton-${i}`} />
          ))}
        </div>
      ) : filteredAndSortedProducts?.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
          {filteredAndSortedProducts?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selectedProductsIds={
                user?.role === "ADMIN" ? selectedProductsIds : undefined
              }
              toggleProductSelection={() => toggleProductSelection(product.id)}
              isInWishList={wishListProductsIds?.includes(product.id)}
              onToggleProductInWishList={() =>
                handleToggleProductInWishList(product.id)
              }
            />
          ))}
        </div>
      ) : (
        <NoResultsFound />
      )}

      <dialog
        ref={addProductDialog}
        className="bg-(--bg-clr) text-(--text-clr) fixed top-1/2 left-1/2 -translate-1/2 rounded-2xl w-[90%] md:w-3/4 max-w-2xl backdrop:backdrop-blur-md shadow-2xl border-2 border-(--primary-clr)/30 overflow-hidden"
        onClick={(e) => {
          if (e.target === addProductDialog.current)
            addProductDialog.current?.close();
        }}
      >
        <div className="flex items-center justify-between p-6 border-b border-(--primary-clr)/20">
          <h2 className="font-bold text-2xl text-(--secondary-clr) flex items-center gap-2">
            <Plus className="size-6" />
            Add New Product
          </h2>
          <button
            type="button"
            className="cursor-pointer bg-(--primary-clr)/10 hover:bg-(--primary-clr)/30 text-(--primary-clr) p-2 rounded-full absolute top-2 right-2"
            onClick={() => addProductDialog.current?.close()}
          >
            <X className="size-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh]">
          <fieldset className="border-2 border-(--primary-clr)/20 rounded-xl p-6">
            <legend className="px-4 text-sm font-bold text-(--primary-clr) uppercase tracking-widest flex items-center gap-2">
              <FileText className="size-4" />
              Product Details
            </legend>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addProductForm.handleSubmit();
              }}
              className="space-y-6 mt-4"
            >
              <addProductForm.Field name="name">
                {(field) => (
                  <FormField field={field} label="Product Name" required />
                )}
              </addProductForm.Field>

              <addProductForm.Field name="description">
                {(field) => (
                  <FormField field={field} label="Description">
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      required
                      placeholder=" "
                      rows={3}
                      className="peer w-full py-2.5 px-3 border-2 border-(--primary-clr)/20 rounded-lg outline-none focus:border-(--secondary-clr) focus:bg-transparent transition-all resize-none"
                    />
                  </FormField>
                )}
              </addProductForm.Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <addProductForm.Field name="price">
                  {(field) => (
                    <FormField
                      field={field}
                      label="Price ($)"
                      type="number"
                      step="0.01"
                      min={0}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                  )}
                </addProductForm.Field>

                <addProductForm.Field name="stockQuantity">
                  {(field) => (
                    <FormField
                      field={field}
                      label="Stock Quantity"
                      type="number"
                      min={0}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                  )}
                </addProductForm.Field>
              </div>

              <addProductForm.Field name="imgUrl">
                {(field) => (
                  <FormField
                    field={field}
                    label="Image URL"
                    type="url"
                    required
                  />
                )}
              </addProductForm.Field>

              <addProductForm.Field name="category">
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor={field.name}
                      className="text-sm font-semibold text-(--primary-clr) ml-1"
                    >
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        field.handleChange(e.target.value as Category)
                      }
                      onBlur={field.handleBlur}
                      className="outline-none cursor-pointer border-2 border-(--primary-clr)/20 rounded-lg py-2.5 px-3 hover:bg-(--primary-clr)/10 focus:border-(--secondary-clr) transition-all"
                    >
                      {[
                        {
                          value: "",
                          label: "--- Select a Category ---",
                        },
                        {
                          value: "SMART_PHONE",
                          label: "Smart Phone",
                        },
                        {
                          value: "TABLET",
                          label: "Tablet",
                        },
                        {
                          value: "LAPTOP",
                          label: "Laptop",
                        },
                        {
                          value: "TV",
                          label: "TV",
                        },
                      ].map((option, i) => (
                        <option
                          value={option.value}
                          key={`category-option-${i}`}
                          disabled={option.value === ""}
                          className="bg-(--bg-clr) text-(--text-clr)"
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0 && (
                        <em className="text-xs text-red-500 font-medium ml-1">
                          {field.state.meta.errors
                            .map((err: Error) => err.message)
                            .join(", ")}
                        </em>
                      )}
                  </div>
                )}
              </addProductForm.Field>

              <div className="mt-6 flex items-center gap-4">
                <button
                  type="reset"
                  onClick={() => addProductForm.reset()}
                  className="cursor-pointer py-3 px-6 rounded-lg font-bold border border-(--primary-clr)/30 hover:bg-(--text-clr)/10 active:scale-[97%]"
                >
                  Reset
                </button>
                <addProductForm.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <button
                      type="submit"
                      disabled={!canSubmit || isSubmitting}
                      className="cursor-pointer flex items-center justify-center gap-2 text-xl py-3 bg-(--primary-clr) flex-1 rounded-lg hover:brightness-110 active:scale-[97%] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Adding product..." : "Add Product"}
                      <Save className="size-5" />
                    </button>
                  )}
                </addProductForm.Subscribe>
              </div>
            </form>
          </fieldset>
        </div>
      </dialog>
    </div>
  );
};

export default ProductsPage;
