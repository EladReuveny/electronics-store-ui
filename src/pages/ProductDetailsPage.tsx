import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { Edit, FileText, Heart, Save, ShoppingCart, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";
import { wishListsApi } from "../api/wish-lists.api";
import FormField from "../components/FormField";
import LoadingSpinner from "../components/LoadingSpinner";
import PageTitle from "../components/PageTitle";
import { wishListsKeys } from "../features/keys/wish-lists.keys";
import { productsMutations } from "../features/mutations/products.mutations";
import { shoppingCartsMutations } from "../features/mutations/shopping-carts.mutations";
import { wishListsMutations } from "../features/mutations/wish-lists.mutations";
import { productsQueries } from "../features/queries/products.queries";
import { useAuthStore } from "../store/auth.store";
import type { Category } from "../types/product.types";
import { handleError } from "../utils/utils";

export const editProductSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  description: z.string().min(5, "Description is too short"),
  price: z.number().min(0, "Price must be positive"),
  imgUrl: z.url("Invalid URL"),
  stockQuantity: z.number().min(0),
  category: z.enum(["SMART_PHONE", "TABLET", "LAPTOP", "TV"]),
});

type ProductDetailsPageProps = {};

const ProductDetailsPage = ({}: ProductDetailsPageProps) => {
  const { productId } = useParams();

  const user = useAuthStore((state) => state.user);

  const editProductDialog = useRef<HTMLDialogElement | null>(null);

  const navigate = useNavigate();

  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
  } = productsQueries.useGetProductById(Number(productId));

  const {
    data: wishListProductsIds,
    isLoading: isWishListProductsIdsLoading,
    error: wishListProductsIdsError,
  } = useQuery({
    queryKey: wishListsKeys.byUserId(user?.id),
    queryFn: () => wishListsApi.getWishListByUserId(user?.id),
    enabled: !!user?.id,
    select: (data) => data.products.map((p) => p.id),
  });

  const { mutate: addProductToWishListMutation } =
    wishListsMutations.useAddProductToWishList();

  const { mutate: removeProductFromWishListMutation } =
    wishListsMutations.useRemoveProductFromWishList();

  const { mutate: addProductToCartMutation } =
    shoppingCartsMutations.useAddProductToCart();

  const { mutate: updateProductMutation } =
    productsMutations.useUpdateProduct();

  useEffect(() => {
    const closeEditProductDialog = (e: MouseEvent) => {
      if (
        editProductDialog.current &&
        editProductDialog.current.open &&
        e.target === editProductDialog.current
      ) {
        editProductDialog.current?.close();
      }
    };

    document.addEventListener("click", closeEditProductDialog);

    return () => {
      document.removeEventListener("click", closeEditProductDialog);
    };
  }, []);

  const handleToggleProductInWishList = (productId: number) => {
    if (wishListProductsIds?.includes(productId)) {
      removeProductFromWishListMutation({ userId: user?.id, productId });
    } else {
      addProductToWishListMutation({ userId: user?.id, productId });
    }
  };

  const editProductForm = useForm({
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
      imgUrl: product?.imgUrl ?? "",
      stockQuantity: product?.stockQuantity ?? 0,
      category: product?.category ?? "SMART_PHONE",
    },
    validators: {
      onChange: editProductSchema,
      onBlur: editProductSchema,
      onSubmit: editProductSchema,
    },
    onSubmit: ({ value }) => {
      updateProductMutation({
        productId: Number(productId),
        productUpdateDto: value,
      });
      editProductDialog.current?.close();
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    addProductToCartMutation(
      {
        userId: user?.id,
        productId: Number(productId),
        quantity: Number(formData.get("quantity")),
      },
      {
        onSuccess: () => navigate("/shopping-cart"),
      },
    );
  };

  if (isProductLoading || isWishListProductsIdsLoading) {
    return <LoadingSpinner />;
  }

  if (productError || wishListProductsIdsError) {
    handleError(productError || wishListProductsIdsError);
    return;
  }

  return (
    <div>
      <PageTitle title="Product Details" />

      {user?.role === "ADMIN" && (
        <button
          type="button"
          className="ml-auto outline-none cursor-pointer flex items-center gap-2 bg-(--primary-clr) py-2 px-6 rounded-lg mb-6 hover:brightness-110 active:scale-[97%]"
          onClick={() => editProductDialog.current?.showModal()}
        >
          Edit Product <Edit className="size-5" />
        </button>
      )}

      <div className="flex flex-col md:flex-row gap-12 bg-(--primary-clr)/5 rounded-2xl p-6 border border-(--primary-clr)/30">
        <div className="relative group rounded-2xl overflow-hidden">
          <img
            src={product.imgUrl}
            alt={product.name}
            className="w-[600px] h-[500px] object-cover hover:scale-105"
          />
          <button
            type="button"
            title={
              wishListProductsIds?.includes(product.id)
                ? "Remove from wish list"
                : "Add to wish list"
            }
            className="cursor-pointer absolute bottom-2 right-2 bg-(--primary-clr)/50 backdrop-blur-md p-3 rounded-full hover:bg-(--primary-clr)"
            onClick={() => handleToggleProductInWishList(product.id)}
          >
            <Heart
              className={`size-6 ${
                wishListProductsIds?.includes(product.id)
                  ? "fill-(--secondary-clr) text-(--secondary-clr)"
                  : ""
              }`}
            />
          </button>
        </div>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col justify-between flex-1"
        >
          <div>
            <div className="flex flex-col gap-2.5">
              <h3 className="text-4xl font-extrabold text-(--secondary-clr) tracking-tight">
                {product.name}
              </h3>
              <span className="bg-(--secondary-clr)/15 text-(--secondary-clr) font-bold py-2 px-4 rounded-md w-fit">
                {product.category
                  .split("_")
                  .map(
                    (word) =>
                      word[0].toUpperCase() + word.slice(1).toLowerCase(),
                  )
                  .join(" ")}
              </span>
              <div className="flex items-center gap-4">
                <span
                  className={`bg-(--secondary-clr)/15 text-(--secondary-clr) text-sm font-bold py-1 px-4 rounded-full border border-(--secondary-clr)/20
                    ${product.stockQuantity > 0 ? "" : "line-through"}`}
                >
                  {product.stockQuantity > 0
                    ? `${product.stockQuantity} in stock`
                    : "Out of stock"}
                </span>
                <span className="text-3xl">${product.price.toFixed(2)}</span>
              </div>
            </div>

            <p className="mt-4 text-lg text-(--text-clr-muted)">
              {product.description}
            </p>
          </div>

          <div className="pt-6 border-t border-(--primary-clr)/35">
            <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="font-semibold text-lg">
                Quantity:
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                defaultValue={1}
                min={1}
                max={product.stockQuantity}
                className="outline-none text-center bg-(--primary-clr)/10 rounded-lg py-2 px-4 font-bold border border-(--primary-clr)/30 focus:border-(--secondary-clr)"
              />
            </div>

            <button
              type="submit"
              className="mt-6 cursor-pointer flex items-center justify-center gap-2 text-xl py-3 bg-(--primary-clr) w-full rounded-lg hover:brightness-110 active:scale-[97%] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart <ShoppingCart className="size-6" />
            </button>
          </div>
        </form>
      </div>

      <dialog
        ref={editProductDialog}
        className="bg-(--bg-clr) text-(--text-clr) fixed top-1/2 left-1/2 -translate-1/2 p-8 rounded-xl w-3/4 backdrop:backdrop-blur-md shadow-2xl border-2 border-(--primary-clr)/30"
        onClick={(e) => {
          if (e.target === editProductDialog.current)
            editProductDialog.current?.close();
        }}
      >
        <button
          type="button"
          className="cursor-pointer bg-(--primary-clr)/10 hover:bg-(--primary-clr)/30 text-(--primary-clr) p-2 rounded-full absolute top-2 right-2"
          onClick={() => editProductDialog.current?.close()}
        >
          <X className="size-5" />
        </button>

        <h2 className="font-bold text-3xl text-center text-(--secondary-clr)">
          Edit Product
        </h2>

        <fieldset className="border-2 border-(--primary-clr)/30 rounded-xl p-6 mt-8">
          <legend className="px-4 text-lg font-bold text-(--primary-clr) flex items-center gap-2">
            <FileText className="size-5" />
            Product Details
          </legend>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              editProductForm.handleSubmit();
            }}
          >
            <div className="space-y-6">
              <editProductForm.Field name="name">
                {(field) => (
                  <FormField field={field} label="Product Name" required />
                )}
              </editProductForm.Field>

              <editProductForm.Field name="description">
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
                      className="peer w-full py-2.5 px-3 border-2 border-(--primary-clr)/30 rounded-lg outline-none focus:border-(--secondary-clr) resize-none"
                    />
                  </FormField>
                )}
              </editProductForm.Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <editProductForm.Field name="price">
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
                </editProductForm.Field>

                <editProductForm.Field name="stockQuantity">
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
                </editProductForm.Field>
              </div>

              <editProductForm.Field name="imgUrl">
                {(field) => (
                  <FormField
                    field={field}
                    label="Image URL"
                    type="url"
                    required
                  />
                )}
              </editProductForm.Field>

              <editProductForm.Field name="category">
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
                      className="outline-none cursor-pointer border-2 border-(--primary-clr)/30 rounded-lg py-2.5 px-3 hover:bg-(--text-clr)/10 focus:border-(--secondary-clr)"
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
              </editProductForm.Field>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <button
                type="reset"
                onClick={() => editProductForm.reset()}
                className="cursor-pointer py-3 px-6 rounded-lg font-bold border border-(--primary-clr)/30 hover:bg-(--text-clr)/10 active:scale-[97%]"
              >
                Reset
              </button>

              <editProductForm.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="cursor-pointer flex items-center justify-center gap-2 text-xl py-3 bg-(--primary-clr) flex-1 rounded-lg hover:brightness-110 active:scale-[97%] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Saving changes..." : "Save Changes"}
                    <Save className="size-5" />
                  </button>
                )}
              </editProductForm.Subscribe>
            </div>
          </form>
        </fieldset>
      </dialog>
    </div>
  );
};

export default ProductDetailsPage;
