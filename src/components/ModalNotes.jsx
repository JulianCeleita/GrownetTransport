import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import {
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import { ModalStyle } from '../styles/ModalStyles'

const ModalNotes = ({
    showModal,
    closeModalMessage,
    title,
    text,
    setNotesOrder,
    sendNotesOrder,
}) => {

    return (
        <Modal
            visible={showModal}
            animationType="slide"
            transparent={true}
        >
            <View style={ModalStyle.modalContainer}>
                <View style={ModalStyle.centeredView}>
                    <View style={ModalStyle.modalView}>
                        <MaterialIcons name="notes" size={45} color={colors.darkBlue} />
                        <Text style={[ModalStyle.modalTextTitle, { marginVertical: 10 }]}>{title}</Text>
                        <Text style={[ModalStyle.modalText, { marginVertical: 10 }]}>{text}</Text>
                        <View style={{ flex: 1, width: '100%' }}>
                            <Text style={[
                                ModalStyle.modalText, {
                                    fontWeight: 'bold',
                                    marginTop: 10,
                                    marginBottom: 5
                                }
                            ]}>Notes</Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                textAlignVertical='top'
                                onChangeText={text => setNotesOrder(text)}
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
                        <View style={[ModalStyle.buttons, { marginTop: 10 }]}>
                            <TouchableOpacity
                                onPress={sendNotesOrder}
                                style={[GlobalStyles.btnPrimary, ModalStyle.space]}
                            >
                                <Text style={GlobalStyles.textBtnSecundary}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => closeModalMessage()}
                                style={GlobalStyles.btnOutline}
                            >
                                <Text style={GlobalStyles.textBtnOutline}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalNotes;
