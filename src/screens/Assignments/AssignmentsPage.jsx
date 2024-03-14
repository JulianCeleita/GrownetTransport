// import React, { useState } from 'react'
// import { SafeAreaView, Text, View, Platform, StyleSheet, TouchableOpacity } from 'react-native'
// import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
// import { TextInput, Provider as PaperProvider } from 'react-native-paper';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { colors } from '../../styles/GlobalStyles';
// import RNPickerSelect from 'react-native-picker-select';

// export const AssignmentsPage = () => {
//     const [driverId, setDriverId] = useState('');
//     const [vehicleId, setVehicleId] = useState('');
//     const [date, setDate] = useState(new Date());
//     const [routeId, setRouteId] = useState('');
//     const [show, setShow] = useState(false);

//     const onChange = (event, selectedDate) => {
//         const currentDate = selectedDate || date;
//         setShow(Platform.OS === 'ios');
//         setDate(currentDate);
//         console.log(new Date(currentDate).toISOString().slice(0, 10));
//     };

//     return (
//         <SafeAreaView style={CustomerDayStyles.customerPrincipal}>
//             <View style={CustomerDayStyles.title2}>
//                 <Text style={CustomerDayStyles.customerTitle}>
//                     Assignments
//                 </Text>
//             </View>
//             <PaperProvider>
//                 <View style={styles.container}>
//                     <View>
//                         <TouchableOpacity
//                             onPress={() => setShow(!show)}
//                             style={styles.button}
//                         >
//                             <Text style={styles.textButton}>Select Date</Text>
//                         </TouchableOpacity>
//                     </View>
//                     {show && (
//                         <DateTimePicker
//                             testID="dateTimePicker"
//                             value={date}
//                             mode="date"
//                             display="default"
//                             onChange={onChange}
//                             style={styles.date}
//                         />
//                     )}
//                     <TextInput
//                         label="Driver ID"
//                         value={driverId}
//                         onChangeText={setDriverId}
//                         style={styles.input}
//                     />
//                     <TextInput
//                         label="Vehicle ID"
//                         value={vehicleId}
//                         onChangeText={setVehicleId}
//                         style={styles.input}
//                     />

//                     <RNPickerSelect
//                         onValueChange={(value) => setRouteId(value)}
//                         items={[
//                             { label: 'R1', value: '1' },
//                             { label: 'R2', value: '2' },
//                             { label: 'R3', value: '3' },
//                             { label: 'R4', value: '4' },
//                             { label: 'R5', value: '5' },
//                             { label: 'R6', value: '6' },
//                             { label: 'R7', value: '7' },
//                             { label: 'R8', value: '8' },
//                             { label: 'R9', value: '9' },
//                             { label: 'R100', value: '100' },

//                         ]}
//                         style={{
//                             ...pickerSelectStyles,
//                             placeholder: { color: 'black' },
//                         }}
//                         value={routeId}
//                         placeholder={{ label: 'Select Route', value: null }}
//                     />
//                 </View>
//             </PaperProvider>
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//     },
//     input: {
//         marginBottom: 16,
//         backgroundColor: '#007aff2e',
//         color: colors.bluePrimary,
//     },
//     date: {
//         marginBottom: 16,
//         alignSelf: 'center',
//     },
//     button: {
//         marginVertical: 16,
//         backgroundColor: colors.bluePrimary,
//         borderRadius: 4,
//     },
//     textButton: {
//         color: 'white',
//         textAlign: 'center',
//         padding: 8,
//     },
//     selectRoute: {
//         marginBottom: 16,
//     },
// });

// const pickerSelectStyles = StyleSheet.create({
//     inputIOS: {
//         fontSize: 16,
//         paddingVertical: 12,
//         paddingHorizontal: 10,
//         borderBottomWidth: 1,
//         borderColor: colors.bluePrimary,
//         borderRadius: 4,
//         color: 'black',
//         paddingRight: 30,
//         backgroundColor: '#007aff2e',
//     },
//     inputAndroid: {
//         fontSize: 16,
//         paddingVertical: 12,
//         paddingHorizontal: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: colors.bluePrimary,
//         borderRadius: 4,
//         color: 'black',
//         paddingRight: 30,
//         backgroundColor: '#007aff2e',
//         placeholderColor: 'black',
//     },
// });
