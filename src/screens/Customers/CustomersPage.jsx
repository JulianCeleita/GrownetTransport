import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native'
import CustomerCard from '../../components/CustomerCard'
import { useCustomersStore } from '../../store/useCustomersStore'
import useEmployeeStore from '../../store/useEmployeeStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'

export const CustomersPage = () => {

    const {
        customers,
        isLoading,
        setFetchCustomers,
        setCustomers,
        error,
    } = useCustomersStore()

    const { selectedDate, selectedRoute, employeeToken } = useEmployeeStore()

    useFocusEffect(
        useCallback(() => {
            setFetchCustomers(employeeToken, selectedDate, selectedRoute)
            return () => setCustomers([])
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
                        {`Customer's`} - {selectedRoute}
                    </Text>
                </View>

                {!isLoading ? (
                    customers.length === 0 && !error ? (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingTop: 40,
                            }}
                        >
                            <Text style={CustomerDayStyles.textCustomer}>There are no customers to show.</Text>
                            <Text style={CustomerDayStyles.textCustomer}>Please contact the route manager.</Text>
                        </View>
                    ) : error ? (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingTop: 40,
                            }}
                        >
                            <Text style={CustomerDayStyles.textCustomer}>{error}</Text>
                            <Text style={CustomerDayStyles.textCustomer}>Please contact the route manager.</Text>
                        </View>
                    ) : (
                        customers.map((customer, index) => (
                            <View key={index} style={{ flex: 1, alignItems: 'center' }}>
                                <CustomerCard customer={customer} />
                            </View>
                        ))
                    )
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
        </SafeAreaView >
    )
}
