import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { BtnCloseSession } from '../../components/BtnCloseSession'
import CustomerCard from '../../components/CustomerCard'
import { useCustomersStore } from '../../store/useCustomersStore'
import useEmployeeStore from '../../store/useEmployeeStore'
import useTokenStore from '../../store/useTokenStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { colors } from '../../styles/GlobalStyles'

export const CustomersPage = () => {

    const {
        customers,
        isLoading,
        setRoutesByDate,
        setCustomers,
    } = useCustomersStore()

    const { selectedDate, selectedRoute } = useEmployeeStore()

    const { token } = useTokenStore()

    useFocusEffect(
        useCallback(() => {
            setRoutesByDate(token, selectedDate, selectedRoute)
            return () => {
                setCustomers([])
            }
        }, [selectedDate, selectedRoute])
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
