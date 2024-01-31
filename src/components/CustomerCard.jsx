import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { CustomerDayStyles } from '../styles/CustomerDayStyles'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const CustomerCard = ({ customer }) => {

  const navigation = useNavigation()

  return (
    <View>
      <TouchableOpacity
        style={[CustomerDayStyles.card, GlobalStyles.boxShadow]}
        onPress={() => navigation.navigate('CustomerActions', { customer })}
      >
        <View style={CustomerDayStyles.cardsLayout}>
          <MaterialCommunityIcons
            name="package-variant"
            size={50}
            color={colors.darkBlue}
          />
        </View>
        <View style={CustomerDayStyles.cardText}>
          <Text style={CustomerDayStyles.titleCustomer}>
            {customer.accountName}:
          </Text>
          <Text style={CustomerDayStyles.textCustomer}>
            {customer.orders_reference}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default CustomerCard
