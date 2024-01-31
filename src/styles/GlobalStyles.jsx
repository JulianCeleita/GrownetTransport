import { StyleSheet } from 'react-native'

export const colors = {
  bluePrimary: '#026CD2',
  darkBlue: '#04444F',
  green: '#62C471',
  lightGreen: '#85FE9D',
  danger: '#EE6055',
  lightBlue: '#F3F9FF',
  gray: '#969696',
  orange: '#FF8A00',
}

export const GlobalStyles = StyleSheet.create({
  boxShadow: {
    shadowColor: '#3B3B3B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 3
  },
  btnPrimary: {
    backgroundColor: colors.bluePrimary,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 30,
    margin: 0.5,
    alignItems: 'center',
  },
  btnSecundary: {
    backgroundColor: colors.darkBlue,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 30,
    margin: 0.5,
    alignItems: 'center',
  },
  textBtnSecundary: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'PoppinsSemi',
  },
  btnWhite: {
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 30,
    marginVertical: 16,
    alignItems: 'center',
  },
  textBtnW: {
    color: colors.darkBlue,
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'PoppinsSemi',
  },
  btnOutline: {
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 30,
    margin: 0.5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.bluePrimary,
  },
  textBtnOutline: {
    color: colors.bluePrimary,
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'PoppinsSemi',
  },
})
