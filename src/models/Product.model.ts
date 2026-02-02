import type {Product} from '../types/Product.types';

/**
 * Product Model
 * Transforms API data to domain model if needed
 * Currently a pass-through, but allows for future transformations
 */
export class ProductModel {
  static fromApi(apiProduct: Product): Product {
    return {
      id: apiProduct.id,
      title: apiProduct.title,
      description: apiProduct.description,
      price: apiProduct.price,
      discountPercentage: apiProduct.discountPercentage,
      rating: apiProduct.rating,
      stock: apiProduct.stock,
      brand: apiProduct.brand,
      category: apiProduct.category,
      thumbnail: apiProduct.thumbnail,
      images: apiProduct.images,
    };
  }

  static fromApiList(apiProducts: Product[]): Product[] {
    return apiProducts.map(product => ProductModel.fromApi(product));
  }
}
