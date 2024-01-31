import { StyleSheet } from 'react-native'
import { colors } from './GlobalStyles'

export const CustomDateStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    color: colors.darkBlue,
    fontFamily: 'PoppinsBold',
  },
  span: {
    color: colors.bluePrimary,
  },
  text: {
    fontFamily: 'PoppinsRegular',
    fontSize: 17,
    textAlign: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 22 : 15,
  },
  whiteBackground: {
    backgroundColor: 'white',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 8,
  },
  dateButton: {
    flexDirection: 'row',
    backgroundColor: colors.bluePrimary,
    paddingVertical: 25,
    paddingHorizontal: 130,
    shadowColor: '#000',
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#144D56',
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    fontSize: 18,
    paddingVertical: 12,
  },
  showMoreButton: {
    backgroundColor: colors.darkBlue,
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: Platform.OS === 'ios' ? 15 : 13,
    paddingHorizontal: Platform.OS === 'ios' ? 20 : 25,
    borderRadius: 50,
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  showMoreButtonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'PoppinsSemi',
    fontSize: Platform.OS === 'ios' ? 16 : 15,
  },
  noDatesText: {
    fontFamily: 'PoppinsSemi',
    fontSize: 18,
  },
})
