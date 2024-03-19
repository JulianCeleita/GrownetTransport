import { StyleSheet } from 'react-native'
import { colors } from './GlobalStyles'

export const CustomerDayStyles = StyleSheet.create({
  customerPrincipal: {
    backgroundColor: 'white',
    flex: 1,
  },
  tittle: {
    backgroundColor: colors.bluePrimary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: -12,
  },
  title2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    width: '100%',
    backgroundColor: 'white',
  },
  customerTitle: {
    fontSize: 22,
    color: colors.bluePrimary,
    fontFamily: 'PoppinsBold',
    textAlign: 'center',
  },
  cardsCustomers: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 20,
  },
  tittleText: {
    fontSize: 24,
    fontFamily: 'PoppinsSemi',
    color: colors.bluePrimary,
  },
  titleCard: {
    width: '65%',
    backgroundColor: 'white',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  textTittle: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'PoppinsBold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 8,
    marginBottom: 2,
    marginTop: 10,
    width: 345,
    height: 100,
  },
  iconCustomer: {
    width: 'auto',
    marginHorizontal: 10,
  },
  cardText: {
    width: '55%',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  titleCustomer: {
    fontSize: 16,
    fontFamily: 'PoppinsSemi',
    color: colors.darkBlue,
    width: '100%', // Asegúrate de que el texto no se desborde
    overflow: 'hidden', // Esconde el texto que se desborde
  },
  textCustomer: {
    fontSize: 15,
    fontFamily: 'PoppinsRegular',
    color: colors.darkBlue,
  },
  checkStatus: {
    width: '23%',
    height: '100%',
    backgroundColor: colors.gray,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleNA: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantTypeTitle: {
    fontSize: 16,
    color: colors.darkBlue,
    fontFamily: 'PoppinsSemi',
    marginRight: 5,
  },
  restaurantTypeTitle: {
    fontSize: 16,
    color: colors.darkBlue,
    fontFamily: 'PoppinsSemi',
    marginRight: 5,
  },
  toggleButton: {
    width: 55,
    height: 30,
    backgroundColor: '#D8D8D8',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
    marginHorizontal: 2,
    flexDirection: 'row',
  },
  toggleOn: {
    backgroundColor: colors.green,
  },
  toggleDot: {
    width: 23,
    height: 23,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  toggleDot2: {
    width: 23,
    height: 23,
    borderRadius: 50,
    marginRight: 1,
    backgroundColor: '#D8D8D8',
  },
  toggleDotOff: {
    backgroundColor: colors.green,
  },
  toggleDotOn: {
    backgroundColor: 'white',
  },
  actionsContainer: {
    flex: 3,
    alignItems: 'center',
  },
  titleActionContainer: {
    flex: 0.2,
    padding: 10,
    alignItems: 'center',
  },
})
