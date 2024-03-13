import {
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins'
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { CustomerActions } from '../screens/Customers/CustomerActions'
import { CustomersPage } from '../screens/Customers/CustomersPage'
import LoginPage from '../screens/Login/LoginPage'
import PinLogin from '../screens/Login/PinLogin'
import useEmployeeStore from '../store/useEmployeeStore'
import useTokenStore from '../store/useTokenStore'
import { colors } from '../styles/GlobalStyles'
import { ShortsVanPage } from '../screens/ShortsVan/ShortsVanPage'
import { ProductsPage } from '../screens/Customers/ProductsPage'
import { SignaturePage } from '../screens/Customers/SignaturePage'
import { AssignmentsPage } from '../screens/Assignments/AssignmentsPage'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function StackCustomers() {
  return (
    <Stack.Navigator
      initialRouteName="CustomersPage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="CustomersPage" component={CustomersPage} />
      <Stack.Screen name="CustomerActions" component={CustomerActions} />
      <Stack.Screen name="ProductsPage" component={ProductsPage} />
      <Stack.Screen name="SignaturePage" component={SignaturePage} />
    </Stack.Navigator>
  )
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Customers"
      screenOptions={{
        tabBarActiveTintColor: colors.darkBlue,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Customers"
        component={StackCustomers}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="package" size={size} color={color} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="ShortsVan"
        component={ShortsVanPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="package-variant"
              size={size}
              color={color}
            />
          ),
          unmountOnBlur: true,
        }}
      />

      <Tab.Screen
        name="Assignments"
        component={AssignmentsPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="assignment-ind"
              size={size}
              color={color}
            />
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  )
}

export default function Navigation() {
  const { token } = useTokenStore()
  const { employeeToken } = useEmployeeStore()

  const [fontsLoaded] = useFonts({
    PoppinsBold: Poppins_700Bold,
    PoppinsRegular: Poppins_400Regular,
    PoppinsMedium: Poppins_500Medium,
    PoppinsSemi: Poppins_600SemiBold,
    PoppinsItalic: Poppins_300Light_Italic,
  })
  useEffect(() => { }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token && !employeeToken ? (
          <Stack.Screen
            name="PinPage"
            component={PinLogin}
            options={{ headerShown: false }}
          />
        ) : token && employeeToken ? (
          <>
            <Stack.Screen
              name="Main"
              component={MyTabs}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
