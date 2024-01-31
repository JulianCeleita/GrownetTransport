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

const ModalAlert = ({
  showModal,
  closeModal = () => {},
  handleOutsidePress = () => {},
  Title = '',
  message = '',
  message2 = '',
  Top,
}) => {
  return (
    <Modal
      visible={showModal}
      animationType="fade"
      transparent={true}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={ModalStyle.modalContainer}>
          <View style={ModalStyle.centeredView}>
            <View style={ModalStyle.modalView}>
              <MaterialIcons name="error-outline" size={45} color="#ee6055" />
              <Text
                style={[ModalStyle.modalTextTitle, { marginTop: Top ? 20 : 0 }]}
              >
                {Title}
              </Text>
              <Text style={ModalStyle.modalText}>{message}</Text>
              <TouchableOpacity
                onPress={closeModal}
                style={[GlobalStyles.btnPrimary, ModalStyle.space]}
              >
                <Text style={GlobalStyles.textBtnSecundary}>{message2}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default ModalAlert
