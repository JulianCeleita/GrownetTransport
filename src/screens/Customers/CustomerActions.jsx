import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'

export const CustomerActions = ({ route }) => {

    const { customer } = route.params

    return (
        <SafeAreaView>
            <Text>{customer.accountName}</Text>
        </SafeAreaView>
    )
}
