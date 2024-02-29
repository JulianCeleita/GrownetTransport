import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import CustomerCard from '../../components/CustomerCard'
import { useCustomersStore } from '../../store/useCustomersStore'
import useEmployeeStore from '../../store/useEmployeeStore'
import useTokenStore from '../../store/useTokenStore'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import ModalRoute from '../../components/ModalRoute'
import { FontAwesome5 } from '@expo/vector-icons'
import { colors } from '../../styles/GlobalStyles'

export const CustomersPage = () => {

    const {
        routes,
        customers,
        isLoading,
        setRoutesByDate,
        setCustomers,
    } = useCustomersStore()

    const { selectedDate, setSelectedRoute, selectedRoute } = useEmployeeStore()
    const { token } = useTokenStore()
    const [showModalRoute, setShowModalRoute] = useState(true);

    useFocusEffect(
        useCallback(() => {
            setRoutesByDate(token, selectedDate)
        }, [selectedDate])
    )

    const selectRoute = (nameRoute) => {
        setSelectedRoute(nameRoute)
        setCustomers(routes, nameRoute)
        setShowModalRoute(false)
    }

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
                    <TouchableOpacity
                        onPress={() => setShowModalRoute(true)}
                        style={{ position: 'absolute', right: 20, top: 3 }}
                    >
                        <FontAwesome5 name="exchange-alt" size={24} color={colors.darkBlue} />
                    </TouchableOpacity>
                </View>

                {!isLoading ? (
                    customers.length === 0 ? (
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
            <ModalRoute
                routes={routes}
                showModal={showModalRoute}
                selectRoute={selectRoute}
                title={'Select a route'}
                text={'Please select a route to view the customers.'}
            />
        </SafeAreaView >
    )
}
