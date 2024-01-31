import { Platform, StyleSheet } from 'react-native'
import { colors } from './GlobalStyles'

export const DeliveryStyles = StyleSheet.create({
  packing: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    height: Platform.OS === 'ios' ? 140 : 100,
  },
  tittle: {
    backgroundColor: colors.bluePrimary,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 15,
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 2,
  },
  textTittle: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'PoppinsBold',
  },
  imageTittle: {
    width: 50,
    height: 37,
    marginRight: 20,
  },
  imageTittlePacking: {
    width: 50,
    height: 43,
    marginRight: 20,
  },
  tittleRoute: {
    backgroundColor: colors.bluePrimary,
    paddingHorizontal: 1,
    paddingVertical: 5,
    borderRadius: 10,
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    width: 90,
    fontFamily: 'PoppinsSemi',
    marginTop: 10,
    overflow: 'hidden',
  },
  textRoute: {
    marginTop: 5,
    fontSize: 17,
    fontFamily: 'PoppinsRegular',
  },
  delivery: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: '100%',
    marginTop: Platform.OS === 'ios' ? 25 : 5,
  },
  card: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10,
    marginBottom: 0,
  },
  circle: {
    marginTop: 15,
  },
})
