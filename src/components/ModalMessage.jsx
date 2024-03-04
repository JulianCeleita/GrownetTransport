import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import {
    Modal,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import { ModalStyle } from '../styles/ModalStyles'

const ModalMessage = ({
    showModal,
    setShowModal,
    title,
    text,
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
                        <MaterialCommunityIcons name="information" size={45} color={colors.darkBlue} />
                        <Text style={[ModalStyle.modalTextTitle, { marginVertical: 10 }]}>{title}</Text>
                        <Text style={[ModalStyle.modalText, { marginVertical: 10 }]}>{text}</Text>
                        <View style={[ModalStyle.buttons, { marginTop: 10 }]}>
                            <TouchableOpacity
                                onPress={() => setShowModal({ show: false, message: '' })}
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

export default ModalMessage;
