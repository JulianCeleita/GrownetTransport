import { Text, TouchableOpacity, View } from 'react-native'
import { PinNumericStyle } from '../styles/LoginStyles'

export default function CalculatorKeyboard({ onNumberPress, setPin, pin }) {
  const numbers = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0]]

  const handleOnNumberPress = (number) => {
    if (number === 'X') {
      if (pin !== '') {
        setPin(pin.slice(0, -1))
      }
    } else {
      onNumberPress(number)
    }
  }

  return (
    <View style={PinNumericStyle.container}>
      {numbers.map((row, rowIndex) => (
        <View key={rowIndex} style={PinNumericStyle.row}>
          {row.map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => handleOnNumberPress(number)}
              style={PinNumericStyle.button}
            >
              <Text style={PinNumericStyle.text}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  )
}
