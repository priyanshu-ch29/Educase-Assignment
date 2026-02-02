import React, { useEffect, useCallback } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    RefreshControl,
    Text,
    TouchableOpacity,
} from 'react-native';
import type { ProductListScreenProps } from '../../types/Navigation.types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProductsThunk } from '../../store/slices/productsSlice';
import { ProductCard } from '../components/ProductCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import type { Product } from '../../types/Product.types';

export const ProductListScreen: React.FC<ProductListScreenProps> = ({
    navigation,
}) => {
    const dispatch = useAppDispatch();
    const { products, loading, loadingMore, error, pagination } = useAppSelector(
        state => state.products,
    );

    // Initial load
    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProductsThunk({ skip: 0, limit: 20 }));
        }
    }, [dispatch, products.length]);

    // Refresh handler
    const handleRefresh = useCallback(() => {
        dispatch(fetchProductsThunk({ skip: 0, limit: 20 }));
    }, [dispatch]);

    // Load more handler (infinite scroll)
    const handleLoadMore = useCallback(() => {
        if (!loadingMore && pagination.hasMore && !loading) {
            dispatch(
                fetchProductsThunk({
                    skip: products.length,
                    limit: 20,
                }),
            );
        }
    }, [dispatch, loadingMore, pagination.hasMore, loading, products.length]);

    // Navigate to product detail
    const handleProductPress = useCallback(
        (productId: number) => {
            navigation.navigate('ProductDetail', { productId });
        },
        [navigation],
    );

    // Navigate to search
    const handleSearchPress = useCallback(() => {
        navigation.navigate('Search');
    }, [navigation]);

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

    // Get item layout for performance
    const getItemLayout = useCallback(
        (_: any, index: number) => ({
            length: 230, // Approximate card height
            offset: 230 * index,
            index,
        }),
        [],
    );

    // Render footer (loading more indicator)
    const renderFooter = useCallback(() => {
        if (!loadingMore) {
            return null;
        }
        return (
            <View style={styles.footerLoader}>
                <LoadingSpinner message="Loading more..." size="small" />
            </View>
        );
    }, [loadingMore]);

    // Render empty state
    const renderEmpty = useCallback(() => {
        if (loading) {
            return null;
        }
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyEmoji}>📦</Text>
                <Text style={styles.emptyText}>No products found</Text>
            </View>
        );
    }, [loading]);

    // Show loading on initial load
    if (loading && products.length === 0) {
        return <LoadingSpinner message="Loading products..." />;
    }

    // Show error
    if (error && products.length === 0) {
        return <ErrorMessage message={error} onRetry={handleRefresh} />;
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Products</Text>
                <TouchableOpacity onPress={handleSearchPress} style={styles.searchButton}>
                    <Text style={styles.searchIcon}>🔍</Text>
                </TouchableOpacity>
            </View>

            {/* Product List */}
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={keyExtractor}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <RefreshControl
                        refreshing={loading && products.length > 0}
                        onRefresh={handleRefresh}
                        colors={['#2563eb']}
                        tintColor="#2563eb"
                    />
                }
                ListFooterComponent={renderFooter}
                ListEmptyComponent={renderEmpty}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={50}
                windowSize={10}
                getItemLayout={getItemLayout}
            />
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111',
    },
    searchButton: {
        padding: 8,
    },
    searchIcon: {
        fontSize: 24,
    },
    listContent: {
        padding: 16,
    },
    row: {
        justifyContent: 'space-between',
    },
    footerLoader: {
        paddingVertical: 20,
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
        fontSize: 18,
        color: '#666',
    },
});
