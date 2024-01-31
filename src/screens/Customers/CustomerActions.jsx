import React from 'react'
import { Platform, SafeAreaView, Text, View } from 'react-native'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { BtnGoBack } from '../../components/BtnGoBack'
import { colors } from '../../styles/GlobalStyles'

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
        </SafeAreaView>
    )
}
