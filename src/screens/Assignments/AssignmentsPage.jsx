import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'

export const AssignmentsPage = () => {
    return (
        <SafeAreaView style={CustomerDayStyles.customerPrincipal}>
            <View style={CustomerDayStyles.title2}>
                <Text style={CustomerDayStyles.customerTitle}>
                    Assignments
                </Text>
            </View>
        </SafeAreaView>
    )
}
