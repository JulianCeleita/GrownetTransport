import React from 'react'
import { Text, View } from 'react-native'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import { ProductStyles } from '../styles/ProductStyles'
import { AntDesign } from '@expo/vector-icons'

export function ProductsCard({
  item,
}) {

  const isNA = item.state_definitive === 'N/A'

  let backColor = colors.gray;
  let iconName = 'questioncircleo';

  if (isNA) {
    backColor = colors.bluePrimary;
  }

  if (item.state_definitive === 'FULL') {
    backColor = colors.green;
    iconName = 'checkcircleo';
  }

  if (item.state_definitive === 'ND' || item.state_definitive === 'PD') {
    backColor = colors.orange;
    iconName = 'arrowright';
  }

  if (item.state_definitive === 'SHORT') {
    backColor = colors.danger;
    iconName = 'closecircleo';
  }

  return (
    <View style={{ alignItems: 'center' }} key={item.id}>
      <View>
        <View style={[ProductStyles.card, GlobalStyles.boxShadow]}>
          <View style={ProductStyles.productTittle}>
            {item.uom != 'Ea' && item.uom != 'Kg' ? (
              <Text
                style={[
                  ProductStyles.tittleCard,
                  {
                    textDecorationLine: isNA ? 'line-through' : 'none',
                  },
                ]}
              >
                {item.name} {item.uom}
                <Text style={ProductStyles.packingText}>
                  {' - ' + item.presentationName}
                </Text>
              </Text>
            ) : (
              <Text
                style={[
                  ProductStyles.tittleCard,
                  {
                    textDecorationLine: isNA ? 'line-through' : 'none',
                  },
                ]}
              >
                {item.name} {item.uom}
              </Text>
            )}
            <View style={ProductStyles.qty}>
              <Text style={ProductStyles.textCard}>
                Qty: {item.quantity}
                {item.quantity_loading > 0 && isNA !== 'N/A' ? (
                  <>
                    {' - '}L: {item.quantity_loading}
                  </>
                ) : null}
              </Text>
            </View>
          </View>
          <View style={[ProductStyles.checkBox, {
            backgroundColor: backColor
          }]}>
            {isNA ? (
              <View>
                <Text style={ProductStyles.textNA}>N/A</Text>
              </View>
            ) : (
              <AntDesign name={iconName} size={30} color="white" />
            )}
          </View>
        </View>
      </View>
    </View>
  )
}
