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
import NetInfo from "@react-native-community/netinfo";


const PinLogin = () => {
  const [pin, setPin] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showEmptyInputModal, setShowEmptyInputModal] = useState(false)
  const { setEmployeeToken, setSelectedRoute, setSelectedDate } = useEmployeeStore()
  const [, setKeyboardOpen] = useState(false)
  const [showModalNoNet, setShowModalNoNet] = useState(false)

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

  const handleSignIn = async () => {
    if (pin === '') {
      setShowEmptyInputModal(true)
      return
    }

    setLoading(true)
    const requestData = {
      pin: pin,
    }

    try {

      const state = await NetInfo.fetch();

      if (state.isConnected && state.isInternetReachable) {
        const response = await mainAxios.post(loginEmployee, requestData)
        if (response.data.status === 200) {
          console.log('response', JSON.stringify(response.data, null, 2));
          let routeName = null
          if (response.data.route && response.data.route.name) {
            routeName = response.data.route.name
          }
          setSelectedRoute(routeName)
          setSelectedDate(new Date().toISOString().slice(0, 10));
          setEmployeeToken(response.data.token)
          setLoading(false)
        } else {
          setShowModal(true)
          setLoading(false)
          resetPin()
        }
      } else {
        setShowModalNoNet(true)
        setLoading(false)
        resetPin()
      }
    } catch (error) {
      setShowModal(true)
      setLoading(false)
      resetPin()
      console.error('Error:', error)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setShowModalNoNet(false)
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
          <ModalAlert
            showModal={showModalNoNet}
            closeModal={closeModal}
            handleOutsidePress={handleOutsidePress}
            Title="We're sorry"
            message="application without internet"
            message2="try later"
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default PinLogin
