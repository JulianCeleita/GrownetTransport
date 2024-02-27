import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { CustomerDayStyles } from '../styles/CustomerDayStyles'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'

const CustomerCard = ({ customer }) => {

  const navigation = useNavigation()

  return (
    <View>
      <TouchableOpacity
        style={[CustomerDayStyles.card, GlobalStyles.boxShadow]}
        onPress={() => navigation.navigate('CustomerActions', { customer })}
      >
        <View style={CustomerDayStyles.iconCustomer}>
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
        <View
          style={CustomerDayStyles.checkStatus}
        >
          <AntDesign name={`questioncircleo`} size={30} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default CustomerCard
