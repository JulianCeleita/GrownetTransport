import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'

export const ProductsPage = ({ route }) => {

    const { customer } = route.params

    return (
        <SafeAreaView>
            <View>
                <Text>ProductsPage</Text>
                <Text>{JSON.stringify(customer, null, 2)}</Text>
            </View>
        </SafeAreaView>
    )
}
