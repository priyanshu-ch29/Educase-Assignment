import React, { useCallback } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import type { SearchScreenProps } from '../../types/Navigation.types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchProductsThunk, resetSearch } from '../../store/slices/productsSlice';
import { SearchBar } from '../components/SearchBar';
import { ProductCard } from '../components/ProductCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { Product } from '../../types/Product.types';

export const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { searchResults, searchLoading, searchQuery } = useAppSelector(
        state => state.products,
    );

    // Handle search
    const handleSearch = useCallback(
        (query: string) => {
            if (query.trim().length > 0) {
                dispatch(searchProductsThunk({ query, skip: 0, limit: 50 }));
            } else {
                dispatch(resetSearch());
            }
        },
        [dispatch],
    );

    // Navigate to product detail
    const handleProductPress = useCallback(
        (productId: number) => {
            navigation.navigate('ProductDetail', { productId });
        },
        [navigation],
    );

    // Render product card
    const renderProduct = useCallback(
        ({ item }: { item: Product }) => (
            <ProductCard
                product={item}
                onPress={() => handleProductPress(item.id)}
            />
        ),
        [handleProductPress],
    );

    // Key extractor
    const keyExtractor = useCallback((item: Product) => item.id.toString(), []);

    // Render empty state
    const renderEmpty = useCallback(() => {
        if (searchLoading) {
            return null;
        }

        if (searchQuery.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyEmoji}>🔍</Text>
                    <Text style={styles.emptyText}>Search for products</Text>
                    <Text style={styles.emptySubtext}>
                        Try searching for "phone", "laptop", or "watch"
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyEmoji}>😕</Text>
                <Text style={styles.emptyText}>No results found</Text>
                <Text style={styles.emptySubtext}>
                    Try a different search term
                </Text>
            </View>
        );
    }, [searchLoading, searchQuery]);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <SearchBar onSearch={handleSearch} autoFocus />
                </View>
            </View>

            {/* Search Results */}
            {searchLoading ? (
                <LoadingSpinner message="Searching..." />
            ) : (
                <FlatList
                    data={searchResults}
                    renderItem={renderProduct}
                    keyExtractor={keyExtractor}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={renderEmpty}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={10}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        paddingVertical: 8,
    },
    backButton: {
        padding: 12,
    },
    backIcon: {
        fontSize: 28,
        color: '#111',
    },
    searchContainer: {
        flex: 1,
        marginRight: 8,
    },
    listContent: {
        padding: 16,
    },
    row: {
        justifyContent: 'space-between',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyEmoji: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});
