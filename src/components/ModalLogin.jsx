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

const ModalLogin = ({
    showModal,
    setShowModal,
    title,
    text,
    access = null,
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
                        {access ? (
                            <View>
                                <Text style={ModalStyle.modalText2}>Email: diego@creativejungle.co</Text>
                                <Text style={[ModalStyle.modalText2, { marginBottom: 10 }]}>Telephone: +44 7309762634</Text>
                            </View>
                        ) : (
                            <View>
                                <Text style={ModalStyle.modalText2}>Email: dev@creativejungle.com</Text>
                                <Text style={ModalStyle.modalText2}>Password: 12345</Text>
                                <Text style={[ModalStyle.modalText2, { marginBottom: 10 }]}>PIN: 1234</Text>
                            </View>
                        )}
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

export default ModalLogin;
