import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { CustomerDayStyles } from '../styles/CustomerDayStyles'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import { ProductStyles } from '../styles/ProductStyles'

const CustomerCard = ({ customer }) => {

  const navigation = useNavigation();
  // checkcircleo
  // closecircleo

  let backgroundColorValue = colors.gray;
  let iconCheck = 'questioncircleo';

  if (customer.delivered === true) {
    backgroundColorValue = colors.green;
    iconCheck = 'checkcircleo';
  }

  if (customer.delivered === false) {
    backgroundColorValue = colors.danger;
    iconCheck = 'closecircleo';
  }

  return (

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
      <View style={[ProductStyles.checkBox, {
        backgroundColor: backgroundColorValue
      }]} >
        <AntDesign name={iconCheck} size={30} color="white" />
      </View>
    </TouchableOpacity>

  )
}

export default CustomerCard
