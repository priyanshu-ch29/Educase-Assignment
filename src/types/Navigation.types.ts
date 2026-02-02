import type {NativeStackScreenProps} from '@react-navigation/native-stack';

// Navigation param list
export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: {productId: number};
  Search: undefined;
};

// Screen props types
export type ProductListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductList'
>;

export type ProductDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;

export type SearchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Search'
>;
