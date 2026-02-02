import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import type { Product } from '../../types/Product.types';
import { formatCurrency, formatRating } from '../../utils/formatters';

interface ProductCardProps {
    product: Product;
    onPress: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 columns with padding

export const ProductCard = React.memo<ProductCardProps>(({ product, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            <Image
                source={{ uri: product.thumbnail }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    {product.title}
                </Text>
                <View style={styles.footer}>
                    <Text style={styles.price}>{formatCurrency(product.price)}</Text>
                    <View style={styles.rating}>
                        <Text style={styles.ratingText}>⭐ {formatRating(product.rating)}</Text>
                    </View>
                </View>
                {product.stock < 10 && product.stock > 0 && (
                    <Text style={styles.lowStock}>Only {product.stock} left!</Text>
                )}
                {product.stock === 0 && (
                    <Text style={styles.outOfStock}>Out of Stock</Text>
                )}
            </View>
        </TouchableOpacity>
    );
});

ProductCard.displayName = 'ProductCard';

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#f0f0f0',
    },
    content: {
        padding: 12,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        height: 40,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2563eb',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 12,
        color: '#666',
    },
    lowStock: {
        fontSize: 11,
        color: '#f59e0b',
        fontWeight: '600',
        marginTop: 4,
    },
    outOfStock: {
        fontSize: 11,
        color: '#ef4444',
        fontWeight: '600',
        marginTop: 4,
    },
});
