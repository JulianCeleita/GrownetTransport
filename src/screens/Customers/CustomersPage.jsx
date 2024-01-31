import React, { useCallback } from 'react'
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { BtnCloseSession } from '../../components/BtnCloseSession'
import { colors } from '../../styles/GlobalStyles'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { useFocusEffect } from '@react-navigation/native'
import { useCustomersStore } from '../../store/useCustomersStore'
import useTokenStore from '../../store/useTokenStore'
import CustomerCard from '../../components/CustomerCard'

export const CustomersPage = () => {

    const {
        customers,
        selectedDate,
        isLoading,
        setRoutesByDate,
        setCustomers,
    } = useCustomersStore()

    const { token } = useTokenStore()

    useFocusEffect(
        useCallback(() => {
            setRoutesByDate(token, selectedDate)
            return () => {
                setCustomers([])
            }
        }, [])
    )


    return (
        <SafeAreaView style={CustomerDayStyles.customerPrincipal}>
            <ScrollView
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={false}
                style={{ marginRight: -3 }}
                contentContainerStyle={{ paddingRight: 3 }}
            >
                <View style={CustomerDayStyles.title2}>
                    <Text style={CustomerDayStyles.customerTitle}>
                        {`Customer's`}
                    </Text>
                </View>

                {!isLoading ? (

                    customers.map((customer, index) => (
                        <View key={index} style={{ flex: 1, alignItems: 'center' }}>
                            <CustomerCard customer={customer} />
                        </View>
                    ))

                ) : (
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
                )}

            </ScrollView>
            <BtnCloseSession color={colors.bluePrimary} />
        </SafeAreaView >
    )
}
