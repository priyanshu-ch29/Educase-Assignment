import {apiClient} from './apiClient';
import type {
  ProductsApiResponse,
  SingleProductApiResponse,
} from '../types/Product.types';

/**
 * Products API
 * Handles all product-related API calls
 */
export class ProductsApi {
  /**
   * Fetch paginated products
   */
  static async fetchProducts(
    skip: number = 0,
    limit: number = 20,
  ): Promise<ProductsApiResponse> {
    return apiClient.get<ProductsApiResponse>(
      `/products?limit=${limit}&skip=${skip}`,
    );
  }

  /**
   * Search products by query
   */
  static async searchProducts(
    query: string,
    skip: number = 0,
    limit: number = 20,
  ): Promise<ProductsApiResponse> {
    return apiClient.get<ProductsApiResponse>(
      `/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`,
    );
  }

  /**
   * Fetch single product by ID
   */
  static async fetchProductById(
    id: number,
  ): Promise<SingleProductApiResponse> {
    return apiClient.get<SingleProductApiResponse>(`/products/${id}`);
  }
}
