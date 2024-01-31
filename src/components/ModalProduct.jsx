import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import { ModalStyle } from '../styles/ModalStyles'

const ModalProduct = ({
  showModal,
  setShowModal,
  setStateCardDefault = null,
  title,
  text,
  confirm,
}) => {
  const handleClose = () => {
    if (setStateCardDefault) {
      setStateCardDefault()
    }
    setShowModal(false)
  }
  return (
    <Modal
      visible={showModal}
      animationType="fade"
      transparent={true}
      onRequestClose={''}
    >
      <TouchableWithoutFeedback>
        <View style={ModalStyle.modalContainer}>
          <View style={ModalStyle.centeredView}>
            <View style={ModalStyle.modalView}>
              <MaterialIcons name="error-outline" size={45} color="#ee6055" />
              <Text style={ModalStyle.modalTextTitle}>{title}</Text>
              <Text style={ModalStyle.modalText}>{text}</Text>
              <View style={[ModalStyle.buttons, { marginTop: 10 }]}>
                <TouchableOpacity
                  onPress={confirm}
                  style={[GlobalStyles.btnPrimary, ModalStyle.space]}
                >
                  <Text style={GlobalStyles.textBtnSecundary}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleClose}
                  style={GlobalStyles.btnOutline}
                >
                  <Text style={GlobalStyles.textBtnOutline}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default ModalProduct
