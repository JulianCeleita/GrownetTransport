import { StyleSheet } from 'react-native'

export const ModalStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  modalView: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextTitle: {
    fontFamily: 'PoppinsSemi',
    fontSize: 21,
    color: '#04444f',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: 'PoppinsRegular',
    color: '#04444f',
    fontSize: 15,
  },
  modalText2: {
    fontFamily: 'PoppinsSemi',
    color: '#026CD2',
    fontSize: 15,
    marginBottom: 5,
  },
  TextChange: {
    fontFamily: 'PoppinsRegular',
    color: '#026CD2',
    marginTop: 10,
  },
  TextChange2: {
    fontFamily: 'PoppinsRegular',
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
    paddingVertical: 3,
    marginBottom: 6,
  },
  bgInt: {
    backgroundColor: '#026CD2',
    borderRadius: 51,
    width: '50%',
  },
  space: {
    marginRight: 5,
  },
  buttons: {
    flexDirection: 'row',
  },
})
