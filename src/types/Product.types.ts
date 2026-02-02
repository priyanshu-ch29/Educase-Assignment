// Product entity from API
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// API Response types
export interface ProductsApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface SingleProductApiResponse extends Product {}

// Redux State types
export interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  searchQuery: string;
  searchResults: Product[];
  searchLoading: boolean;
  pagination: {
    skip: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

// Action payload types
export interface FetchProductsPayload {
  skip: number;
  limit: number;
}

export interface SearchProductsPayload {
  query: string;
  skip: number;
  limit: number;
}
