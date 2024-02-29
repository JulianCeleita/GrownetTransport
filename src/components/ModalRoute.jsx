import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { GlobalStyles, colors } from '../styles/GlobalStyles'
import { ModalStyle } from '../styles/ModalStyles'

const ModalRoute = ({
  routes,
  showModal,
  selectRoute,
  title,
  text,
}) => {

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
              <MaterialCommunityIcons name="truck-check-outline" size={45} color={colors.green} />
              <Text style={ModalStyle.modalTextTitle}>{title}</Text>
              <Text style={[ModalStyle.modalText, { marginVertical: 10 }]}>{text}</Text>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {routes.map((route, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[GlobalStyles.btnPrimary, { borderRadius: 10, width: 90, marginBottom: 5, marginLeft: 2 }]}
                    onPress={() => selectRoute(route.nameRoute)}
                  >
                    <Text style={GlobalStyles.textBtnSecundary}>{route.nameRoute}</Text>
                  </TouchableOpacity>
                ))}
              </View>

            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default ModalRoute;
