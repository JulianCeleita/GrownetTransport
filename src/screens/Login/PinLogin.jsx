import React, { useEffect, useState } from 'react'
import {
  Image,
  Keyboard,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import mainAxios from '../../../axios.config'
import ModalAlert from '../../components/ModalAlert'
import NumericKeyboard from '../../components/numericKeyboard'
import { loginEmployee } from '../../config/urls.config'
import logo from '../../img/Logo_Blanco.png'
import useEmployeeStore from '../../store/useEmployeeStore'
import { colors } from '../../styles/GlobalStyles'
import { LoginStyles, PinNumericStyle } from '../../styles/LoginStyles'

const PinLogin = () => {
  const [pin, setPin] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showEmptyInputModal, setShowEmptyInputModal] = useState(false)
  const { setEmployeeToken, setSelectedRoute, setSelectedDate } = useEmployeeStore()
  const [, setKeyboardOpen] = useState(false)


  useEffect(() => {
    if (pin.length === 4) {
      handleSignIn()
    }
  }, [pin])

  useEffect(() => {
    if (Platform.OS === 'android') {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setKeyboardOpen(true)
        },
      )
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardOpen(false)
        },
      )

      return () => {
        keyboardDidShowListener.remove()
        keyboardDidHideListener.remove()
      }
    }
  }, [])

  const handleSignIn = () => {
    if (pin === '') {
      setShowEmptyInputModal(true)
      return
    }
    setLoading(true)
    const requestData = {
      pin: pin,
    }
    mainAxios
      .post(loginEmployee, requestData)
      .then((response) => {
        if (response.data.status === 200) {
          // TODO: Cambiar la ruta cuando llegue asignada al usuario logueado
          const date = new Date();
          date.setDate(date.getDate() + 1);
          setSelectedRoute("R4")
          // setSelectedDate(new Date().toISOString().slice(0, 10));
          setSelectedDate(date.toISOString().slice(0, 10));
          setEmployeeToken(response.data.token)
          setLoading(false)
        } else {
          setShowModal(true)
          setLoading(false)
        }
      })
      .catch((error) => {
        setShowModal(true)
        setLoading(false)
        console.error('Error:', error)
      })
  }
  const closeModal = () => {
    setShowModal(false)
    setShowEmptyInputModal(false)
  }
  const handleOutsidePress = () => {
    closeModal()
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }
  const resetPin = () => {
    setPin('')
  }
  const handleBackspace = () => {
    if (pin !== '') {
      setPin(pin.slice(0, -1))
    }
  }

  return (
    <View
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={LoginStyles.container}>
          <StatusBar style="light" />
          <Image source={logo} style={PinNumericStyle.logo} />
          <Text style={LoginStyles.loginHeaderText}>Identify yourself</Text>
          <View style={PinNumericStyle.pinContainer}>
            {[...Array(4)].map((_, index) => (
              <View
                key={index}
                style={[
                  PinNumericStyle.pinDot,
                  {
                    backgroundColor:
                      pin.length > index ? colors.lightGreen : '#125FAA',
                    borderColor: pin.length > index ? 'transparent' : '#A7D4FF',
                  },
                ]}
              />
            ))}
          </View>

          <NumericKeyboard
            onNumberPress={(number) => setPin(pin + number)}
            setPin={setPin}
            pin={pin}
          />
          <TouchableOpacity
            style={
              loading
                ? LoginStyles.signInButtonDisabled
                : LoginStyles.signInButton
            }
            onPress={handleBackspace}
          >
            <Text style={LoginStyles.signInButtonText}>Delete</Text>
          </TouchableOpacity>
          <ModalAlert
            showModal={showModal}
            closeModal={closeModal}
            handleOutsidePress={handleOutsidePress}
            Title="We're sorry"
            message="Invalid credentials"
            message2="Try again"
          />
          <ModalAlert
            showModal={showEmptyInputModal}
            closeModal={closeModal}
            handleOutsidePress={handleOutsidePress}
            Title="We're sorry"
            message="Please enter your pin"
            message2="Try again"
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default PinLogin
