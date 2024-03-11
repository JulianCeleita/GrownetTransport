import React, { useState } from 'react';
import { Platform, Text, View } from 'react-native';
import Signature from 'react-native-signature-canvas';
import { BtnGoBack } from '../../components/BtnGoBack';
import { colors } from '../../styles/GlobalStyles';
import { CustomerDayStyles } from '../../styles/CustomerDayStyles';
import * as FileSystem from 'expo-file-system';
import { useProductSubmit } from '../../hooks/useProductSubmit';
import ModalMessage from '../../components/ModalMessage';
import { useNavigation } from '@react-navigation/native';

export const SignaturePage = ({ route }) => {
    const { customer } = route.params;
    const navigation = useNavigation();

    const { handleSubmitCustomer } = useProductSubmit();
    const [showModalMessage, setShowModalMessage] = useState({ show: false, message: '' })

    const handleSignature = async (signature) => {
        const fileName = FileSystem.documentDirectory + `${customer.orders_reference}_signature.png`;
        await FileSystem.writeAsStringAsync(fileName, signature.split('data:image/png;base64,')[1], {
            encoding: FileSystem.EncodingType.Base64,
        });

        const fileObject = {
            fileName: `${customer.orders_reference}_signature.png`,
            fileType: 'png',
            fileUri: fileName,
        };

        const { status, message } = await handleSubmitCustomer(customer.orders_reference, true, fileObject, null);
        setShowModalMessage({ show: status, message: message })
    };

    const closeModalMessage = () => {
        setShowModalMessage({ show: false, message: '' })
        navigation.navigate('CustomersPage');
    }

    return (
        <View style={{ flex: 1 }}>
            <BtnGoBack color={colors.darkBlue} top={Platform.OS === 'ios' ? 60 : 15} />
            <View style={CustomerDayStyles.title2}>
                <Text style={CustomerDayStyles.customerTitle}>
                    {customer.accountName}
                </Text>
            </View>
            <Signature
                onOK={handleSignature}
                style={{ flex: 1, height: 1200 }}
            />
            <ModalMessage
                showModal={showModalMessage.show}
                closeModalMessage={closeModalMessage}
                title={`Order: ${customer.orders_reference}`}
                text="The order has been updated successfully"
            />
        </View>
    );
};
