import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BtnGoBack } from '../../components/BtnGoBack';
import ProductSearcher from '../../components/ProductSearch';
import { ProductsCard } from '../../components/ProductsCard';
import useEmployeeStore from '../../store/useEmployeeStore';
import { useProductsStore } from '../../store/useProductsStore';
import { CustomerDayStyles } from '../../styles/CustomerDayStyles';
import { colors } from '../../styles/GlobalStyles';
import { ProductStyles } from '../../styles/ProductStyles';

export const ProductsPage = ({ route }) => {

    const { customer } = route.params;
    const { employeeToken } = useEmployeeStore();
    const { products, isLoading, setProducts, setFetchProducts } = useProductsStore()
    const [search, setSearch] = useState(false)
    const [searchPhrase, setSearchPhrase] = useState('')

    const handleSearch = () => {
        setSearch(true)
    }

    useFocusEffect(
        useCallback(() => {
            setFetchProducts(employeeToken, customer.orders_reference)
            return () => {
                setProducts(null)
            }
        }, [employeeToken, customer]),
    );

    const filteredData =
        products && products.data
            ? products.data.filter((item) =>
                item.name.toLowerCase().includes(searchPhrase.toLowerCase()),
            ) : []

    const groupedProducts = filteredData.reduce((grouped, product) => {
        const key = product.presentationType
        if (!grouped[key]) {
            grouped[key] = []
        }
        grouped[key].push(product)
        return grouped
    }, {})

    return (
        <SafeAreaView style={ProductStyles.products}>
            {search ? (
                <View>
                    <BtnGoBack color={colors.darkBlue} top={20} />
                    <ProductSearcher
                        setSearch={setSearch}
                        searchPhrase={searchPhrase}
                        setSearchPhrase={setSearchPhrase}
                    />
                </View>
            ) : (
                <View style={{ paddingHorizontal: 43, width: '100%' }}>
                    <BtnGoBack color={colors.darkBlue} />
                    <View>
                        <Text style={ProductStyles.customerTitle}>
                            <Text>{customer.accountName} - </Text>
                            <Text style={{ flexWrap: 'wrap' }}>
                                {products ? customer.orderNumber : 'Loading...'}
                            </Text>
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleSearch}
                        style={CustomerDayStyles.icon}
                    >
                        <Ionicons
                            name="search-circle-outline"
                            size={35}
                            color={colors.darkBlue}
                        />
                    </TouchableOpacity>
                </View>
            )}

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginRight: -3 }}
                contentContainerStyle={{ paddingRight: 3 }}
            >
                {!isLoading ? (
                    products && products.length !== 0 ? (
                        <View style={ProductStyles.cardsProducts}>
                            {Object.entries(groupedProducts).map(([group, products]) => (
                                <View key={group}>
                                    <Text style={CustomerDayStyles.restaurantTypeTitle}>
                                        {group}
                                    </Text>
                                    {products.map((product) => (
                                        <ProductsCard
                                            key={product.id}
                                            item={product}
                                        />
                                    ))}
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text>No products available</Text>
                        </View>
                    )
                ) : (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}
