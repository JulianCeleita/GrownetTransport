import React from 'react'
import { Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { BtnGoBack } from '../../components/BtnGoBack'
import { GlobalStyles, colors } from '../../styles/GlobalStyles'
import { ProductStyles } from '../../styles/ProductStyles'

export const CustomerActions = ({ route }) => {

    const { customer } = route.params

    return (
        <SafeAreaView style={CustomerDayStyles.customerPrincipal}>
            <BtnGoBack color={colors.darkBlue} top={Platform.OS === 'ios' ? 70 : 15} />
            <View style={CustomerDayStyles.title2}>
                <Text style={CustomerDayStyles.customerTitle}>
                    {customer.accountName}
                </Text>
            </View>
            <View style={CustomerDayStyles.titleActionContainer}>
                <Text style={ProductStyles.tittleCard}>Order: {customer.orders_reference}</Text>
            </View>
            <View style={CustomerDayStyles.actionsContainer}>
                <TouchableOpacity style={[
                    ProductStyles.card,
                    GlobalStyles.boxShadow,
                    { justifyContent: 'center', alignItems: 'center' }
                ]}>
                    <Text style={ProductStyles.tittleCard}>Delivered</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[
                    ProductStyles.card,
                    GlobalStyles.boxShadow,
                    { justifyContent: 'center', alignItems: 'center' }
                ]}>
                    <Text style={ProductStyles.tittleCard}>Do not delivered</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[
                    ProductStyles.card,
                    GlobalStyles.boxShadow,
                    { justifyContent: 'center', alignItems: 'center' }
                ]}>
                    <Text style={ProductStyles.tittleCard}>Add evidence</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}
