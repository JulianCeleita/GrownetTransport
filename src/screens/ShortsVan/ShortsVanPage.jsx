import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ProductSearcher from '../../components/ProductSearch'
import { ProductsCardShortsVan } from '../../components/ProductsCardShortsVan'
import { insertShort } from '../../config/urls.config'
import { useProductSubmit } from '../../hooks/useProductSubmit'
import useEmployeeStore from '../../store/useEmployeeStore'
import { useShortVanStore } from '../../store/useShortVanStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { GlobalStyles, colors } from '../../styles/GlobalStyles'
import { ProductStyles } from '../../styles/ProductStyles'

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
    const [search, setSearch] = useState(false)
    const [searchPhrase, setSearchPhrase] = useState('')

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

    const filteredData = shortVanProducts.map((restaurant) => {
        let filteredProducts = restaurant.products.filter((product) =>
            product.name
                .trim()
                .toLowerCase()
                .includes(searchPhrase.trim().toLowerCase()),
        )
        return { ...restaurant, products: filteredProducts }
    })

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

    return (
        <SafeAreaView style={ProductStyles.products}>
            {search ? (
                <View style={{ marginTop: Platform.OS === 'android' ? 20 : 0 }} >
                    <ProductSearcher
                        setSearch={setSearch}
                        searchPhrase={searchPhrase}
                        setSearchPhrase={setSearchPhrase}
                    />
                </View>
            ) : (
                <View style={{
                    paddingHorizontal: 30,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: Platform.OS === 'android' ? 20 : 0
                }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={CustomerDayStyles.customerTitle}>
                            {selectedRoute}
                        </Text>
                    </View>
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
                        <TouchableOpacity
                            onPress={() => setSearch(true)}
                        >
                            <Ionicons
                                name="search-circle-outline"
                                size={38}
                                color={colors.darkBlue}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
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
                            {filteredData.length === 0 ? (
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
                                filteredData.map((restaurant) => (
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
