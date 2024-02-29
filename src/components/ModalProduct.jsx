import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import { ModalStyle } from '../styles/ModalStyles'
import { useGetEvidence } from '../hooks/useGetEvidence'

const ModalProduct = ({
  showModal,
  setShowModal,
  confirm,
  setStateCardDefault = null,
  title,
  text,
  modalEvidence = null,
  setEvidence = null,
  setNotes = null,
}) => {

  const { pickImageFromGallery, pickImageFromCamera } = useGetEvidence();

  const handleClose = () => {
    if (setStateCardDefault) {
      setStateCardDefault()
    }
    setShowModal(false)
  }

  return (
    <Modal
      visible={showModal}
      animationType="slide"
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

              {modalEvidence ? (
                <View style={ModalStyle.optionsContainer}>
                  <TouchableOpacity
                    onPress={() => pickImageFromGallery(setEvidence, handleClose)}
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    <MaterialIcons name="collections" size={35} color={colors.darkBlue} />
                    <Text style={ModalStyle.modalText}>Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => pickImageFromCamera(setEvidence, handleClose)}
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    <MaterialIcons name="camera-alt" size={35} color={colors.darkBlue} />
                    <Text style={ModalStyle.modalText}>Camera</Text>
                  </TouchableOpacity>
                </View>
              ) : setNotes ? (
                <View style={{ flex: 1, width: '100%' }}>
                  <Text style={[
                    ModalStyle.modalText, {
                      fontWeight: 'bold',
                      marginTop: 10,
                      marginBottom: 5
                    }
                  ]}>Observations</Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical='top'
                    onChangeText={text => setNotes(text)}
                    style={{
                      height: 100,
                      borderColor: 'gray',
                      borderWidth: 1,
                      borderRadius: 5,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      marginBottom: 10,
                    }}
                  />
                </View>
              ) : null}

              <View style={[ModalStyle.buttons, { marginTop: 10 }]}>

                {!modalEvidence ? (
                  <TouchableOpacity
                    onPress={confirm}
                    style={[GlobalStyles.btnPrimary, ModalStyle.space]}
                  >
                    <Text style={GlobalStyles.textBtnSecundary}>Confirm</Text>
                  </TouchableOpacity>
                ) : null}

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
