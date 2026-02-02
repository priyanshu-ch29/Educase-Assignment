import React, { useState, useMemo } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { debounce } from '../../utils/debounce';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    placeholder = 'Search products...',
    autoFocus = false,
}) => {
    const [value, setValue] = useState('');

    // Debounced search to prevent excessive API calls
    const debouncedSearch = useMemo(
        () => debounce((query: string) => {
            onSearch(query);
        }, 300),
        [onSearch],
    );

    const handleChangeText = (text: string) => {
        setValue(text);
        debouncedSearch(text);
    };

    const handleClear = () => {
        setValue('');
        onSearch('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.icon}>🔍</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={handleChangeText}
                placeholder={placeholder}
                placeholderTextColor="#999"
                autoFocus={autoFocus}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
            />
            {value.length > 0 && (
                <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                    <Text style={styles.clearText}>✕</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        marginHorizontal: 16,
        marginVertical: 8,
    },
    icon: {
        fontSize: 18,
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        padding: 0,
    },
    clearButton: {
        padding: 4,
    },
    clearText: {
        fontSize: 18,
        color: '#999',
    },
});
