import type {
  Category,
  Product,
  ProductUpdateDto,
} from "../types/product.types";
import { api } from "./api.config";

const RESOURCE_PREFIX = "products";

export const productsApi = {
  getProductById: async (productId: number): Promise<Product> => {
    const { data } = await api.get(`${RESOURCE_PREFIX}/${productId}`);
    return data;
  },
  getAllProducts: async (): Promise<Product[]> => {
    const { data } = await api.get(`${RESOURCE_PREFIX}`);
    return data;
  },
  searchProductsByName: async (query: string): Promise<Product[]> => {
    const { data } = await api.get(`${RESOURCE_PREFIX}/search`, {
      params: { query },
    });
    return data;
  },
  getProductsByCategory: async (category: Category): Promise<Product[]> => {
    const { data } = await api.get(`${RESOURCE_PREFIX}/category/${category}`);
    return data;
  },
  addProduct: async (product: Product): Promise<Product> => {
    const { data } = await api.post(`${RESOURCE_PREFIX}`, product);
    return data;
  },
  updateProduct: async (
    productId: number,
    productUpdateDto: ProductUpdateDto,
  ): Promise<Product> => {
    const { data } = await api.put(
      `${RESOURCE_PREFIX}/${productId}`,
      productUpdateDto,
    );
    return data;
  },
  deleteProductById: async (productId: number): Promise<void> => {
    await api.delete(`${RESOURCE_PREFIX}/${productId}`);
  },
  removeSelectedProducts: async (productIds: number[]): Promise<string> => {
    const { data } = await api.put(
      `${RESOURCE_PREFIX}/remove-selected-products`,
      productIds,
    );
    return data;
  },
};
