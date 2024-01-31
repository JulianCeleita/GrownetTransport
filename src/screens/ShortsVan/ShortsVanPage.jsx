import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { BtnCloseSession } from '../../components/BtnCloseSession'
import { colors, GlobalStyles } from '../../styles/GlobalStyles'
import { useShortVanStore } from '../../store/useShortVanStore'
import useEmployeeStore from '../../store/useEmployeeStore'
import { useFocusEffect } from '@react-navigation/native'
import { ProductStyles } from '../../styles/ProductStyles'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ProductsCardShortsVan } from '../../components/ProductsCardShortsVan'

export const ShortsVanPage = () => {

    const {
        shortVanProducts,
        setRestaurantData,
        setFetchShortVanProducts,
        isLoading,
    } = useShortVanStore()

    const { employeeToken } = useEmployeeStore()
    const [toggle, setToggle] = useState(false)
    const [dataVan, setDataVan] = useState({
        routeName: "R1",
        date: new Date().toISOString().slice(0, 10),
    })

    useFocusEffect(
        useCallback(() => {
            setFetchShortVanProducts(employeeToken, dataVan, toggle)
            return () => {
                setRestaurantData([])
                setToggle(false)
            }
        }, [employeeToken]),
    )

    useEffect(() => {
        setFetchShortVanProducts(employeeToken, dataVan, toggle)
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

    return (
        <SafeAreaView style={ProductStyles.products}>
            <BtnCloseSession color={colors.bluePrimary} />
            <View style={CustomerDayStyles.title2}>
                <View>
                    <Text style={CustomerDayStyles.customerTitle}>
                        {dataVan.routeName}
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
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <View>
                            {shortVanProducts.map((restaurant) => (
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
                                                    // handleSubmit={handleSubmit}
                                                    updateProductsVan={updateProductsVan}
                                                />
                                            ))}
                                        </View>
                                    </View>
                                )
                            ))}
                        </View>
                    )}
                </ScrollView>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}
