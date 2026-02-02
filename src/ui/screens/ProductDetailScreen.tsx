import React, { useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import type { ProductDetailScreenProps } from '../../types/Navigation.types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProductByIdThunk } from '../../store/slices/productsSlice';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { formatCurrency, formatRating } from '../../utils/formatters';

const { width } = Dimensions.get('window');

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
    route,
    navigation,
}) => {
    const { productId } = route.params;
    const dispatch = useAppDispatch();
    const { currentProduct, loading, error } = useAppSelector(
        state => state.products,
    );

    useEffect(() => {
        dispatch(fetchProductByIdThunk(productId));
    }, [dispatch, productId]);

    const handleRetry = () => {
        dispatch(fetchProductByIdThunk(productId));
    };

    if (loading) {
        return <LoadingSpinner message="Loading product details..." />;
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={handleRetry} />;
    }

    if (!currentProduct) {
        return <ErrorMessage message="Product not found" />;
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Product Details</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.scrollView}>
                {/* Image Gallery */}
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    style={styles.imageGallery}>
                    {currentProduct.images.map((image, index) => (
                        <Image
                            key={index}
                            source={{ uri: image }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    ))}
                </ScrollView>

                {/* Product Info */}
                <View style={styles.content}>
                    <Text style={styles.title}>{currentProduct.title}</Text>

                    <View style={styles.metaRow}>
                        <Text style={styles.price}>{formatCurrency(currentProduct.price)}</Text>
                        <View style={styles.rating}>
                            <Text style={styles.ratingText}>
                                ⭐ {formatRating(currentProduct.rating)}
                            </Text>
                        </View>
                    </View>

                    {currentProduct.discountPercentage > 0 && (
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>
                                {currentProduct.discountPercentage.toFixed(0)}% OFF
                            </Text>
                        </View>
                    )}

                    <View style={styles.infoRow}>
                        <InfoItem label="Brand" value={currentProduct.brand} />
                        <InfoItem label="Category" value={currentProduct.category} />
                    </View>

                    <View style={styles.infoRow}>
                        <InfoItem
                            label="Stock"
                            value={
                                currentProduct.stock > 0
                                    ? `${currentProduct.stock} available`
                                    : 'Out of stock'
                            }
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>{currentProduct.description}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <View style={styles.infoItem}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    backButton: {
        padding: 4,
    },
    backIcon: {
        fontSize: 28,
        color: '#111',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111',
    },
    placeholder: {
        width: 36,
    },
    scrollView: {
        flex: 1,
    },
    imageGallery: {
        height: 300,
    },
    image: {
        width,
        height: 300,
        backgroundColor: '#f0f0f0',
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111',
        marginBottom: 12,
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    price: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2563eb',
    },
    rating: {
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    discountBadge: {
        backgroundColor: '#10b981',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    discountText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    infoItem: {
        flex: 1,
        backgroundColor: '#f9fafb',
        padding: 12,
        borderRadius: 8,
        marginRight: 8,
    },
    infoLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111',
    },
    section: {
        marginTop: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666',
    },
});
