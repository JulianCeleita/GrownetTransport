import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ProductsCardShortsVan } from '../../components/ProductsCardShortsVan'
import useEmployeeStore from '../../store/useEmployeeStore'
import { useShortVanStore } from '../../store/useShortVanStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { GlobalStyles } from '../../styles/GlobalStyles'
import { ProductStyles } from '../../styles/ProductStyles'
import { useProductSubmit } from '../../hooks/useProductSubmit'
import { insertShort } from '../../config/urls.config'

export const ShortsVanPage = () => {

    const {
        shortVanProducts,
        setRestaurantData,
        setFetchShortVanProducts,
        isLoading,
    } = useShortVanStore()

    const { handleSubmit } = useProductSubmit(insertShort)

    const { employeeToken, selectedDate, selectedRoute } = useEmployeeStore()
    const [toggle, setToggle] = useState(false)

    useFocusEffect(
        useCallback(() => {
            setFetchShortVanProducts(
                employeeToken,
                { routeName: selectedRoute, date: selectedDate },
                toggle
            )
            return () => {
                setRestaurantData([])
                setToggle(false)
            }
        }, [selectedDate, selectedRoute]),
    )

    useEffect(() => {
        setFetchShortVanProducts(
            employeeToken,
            { routeName: selectedRoute, date: selectedDate },
            toggle
        )
    }, [toggle])

    const updateProductsVan = (itemId, quantity = null, state = null) => {
        const newProducts = shortVanProducts.map((itemProd) => {
            return {
                ...itemProd,
                products: itemProd.products
                    .map((product) => {
                        if (product.id === itemId) {
                            return {
                                ...product,
                                packed: quantity,
                                state_definitive: state ? state : null,
                                quantity_defitive: quantity === null
                                    ? null
                                    : product.quantity_defitive,
                            }
                        }
                        return product
                    })
                    .filter(product => !(product.state_definitive === "N/A")),
            }
        })
        setRestaurantData(newProducts)
    }

    const toggleButton = () => {
        setToggle((previousToggle) => !previousToggle)
    }

    console.log('shortVanProducts', JSON.stringify(shortVanProducts, null, 2));

    return (
        <SafeAreaView style={ProductStyles.products}>
            <View style={CustomerDayStyles.title2}>
                <View>
                    <Text style={CustomerDayStyles.customerTitle}>
                        {selectedRoute}
                    </Text>
                    <View style={CustomerDayStyles.titleNA}>
                        <Text style={CustomerDayStyles.restaurantTypeTitle}>N/A</Text>
                        <TouchableOpacity onPress={toggleButton} activeOpacity={1}>
                            <View
                                style={[
                                    CustomerDayStyles.toggleButton,
                                    toggle && CustomerDayStyles.toggleOn,
                                    GlobalStyles.boxShadow,
                                ]}
                            >
                                <View
                                    style={[
                                        CustomerDayStyles.toggleDot,
                                        toggle && CustomerDayStyles.toggleDotOff,
                                    ]}
                                />
                                <View
                                    style={[
                                        CustomerDayStyles.toggleDot2,
                                        toggle && CustomerDayStyles.toggleDotOn,
                                    ]}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <KeyboardAwareScrollView
                enableOnAndroid
                extraScrollHeight={Platform.OS === 'android' ? 210 : 210}
                showsVerticalScrollIndicator={false}
                style={{ marginRight: -3 }}
                contentContainerStyle={{ paddingRight: 3 }}
            >
                <ScrollView>
                    {isLoading ? (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingTop: 40,
                            }}
                        >
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    ) : (
                        <View>
                            {shortVanProducts.length === 0 ? (
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingTop: 40,
                                    }}
                                >
                                    <Text style={CustomerDayStyles.textCustomer}>There are no products to show.</Text>
                                </View>
                            ) : (
                                shortVanProducts.map((restaurant) => (
                                    restaurant.products.length > 0 && (
                                        <View key={restaurant.customerName}>
                                            <Text style={[CustomerDayStyles.restaurantTypeTitle]}>
                                                {restaurant.customerName}
                                            </Text>
                                            <View>
                                                {restaurant.products.map((product, index) => (
                                                    <ProductsCardShortsVan
                                                        key={index}
                                                        item={product}
                                                        handleSubmit={handleSubmit}
                                                        updateProductsVan={updateProductsVan}
                                                    />
                                                ))}
                                            </View>
                                        </View>
                                    )
                                ))
                            )}
                        </View>
                    )}
                </ScrollView>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}
