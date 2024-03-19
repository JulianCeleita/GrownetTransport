import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { BtnGoBack } from '../../components/BtnGoBack'
import { ModalLoading } from '../../components/ModalLoading'
import ModalMessage from '../../components/ModalMessage'
import ModalProduct from '../../components/ModalProduct'
import { useProductSubmit } from '../../hooks/useProductSubmit'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { GlobalStyles, colors } from '../../styles/GlobalStyles'
import { ProductStyles } from '../../styles/ProductStyles'

export const CustomerActions = ({ route }) => {

    const { customer } = route.params
    const navigation = useNavigation()
    const [showModalEvidence, setShowModalEvidence] = useState(false)
    const [showModalNotDelivered, setShowModalNotDelivered] = useState(false)
    const [showModalMessage, setShowModalMessage] = useState({ show: false, message: '' })
    const [evidence, setEvidence] = useState(null)
    const [specialInstructions, setSpecialInstructions] = useState()
    const [notes, setNotes] = useState('')
    const [statusCustomer, setStatusCustomer] = useState(customer.delivered)
    const [loading, setLoading] = useState(false)
    const { getSpecialInstructions, handleSubmitCustomer } = useProductSubmit()

    const confirmNotDelivered = async () => {
        setLoading(true);
        const { status, message } = await handleSubmitCustomer(customer.orders_reference, false, null, notes);
        setLoading(false);
        setShowModalMessage({ show: true, message: message })
        if (status) {
            setStatusCustomer(false)
        }
        handleClose();
    }

    const getSpecialInstruction = async () => {
        try {
            const response = await getSpecialInstructions(customer.orders_reference)
            setSpecialInstructions(response)
        } catch (error) {
            console.error('Error al obtener las instrucciones especiales: ', error)
        }
    }

    const submitEvidence = async () => {
        if (evidence !== null) {
            setLoading(true);
            const { status, message } = await handleSubmitCustomer(customer.orders_reference, true, evidence, null);
            setLoading(false);
            setShowModalMessage({ show: true, message: message })
            if (status) {
                setStatusCustomer(true)
            }
            setEvidence(null)
        }
    }

    useEffect(() => {
        submitEvidence()
    }, [evidence]);

    useEffect(() => {
        getSpecialInstruction()
    }, []);

    const handleClose = () => {
        if (showModalEvidence) {
            setShowModalEvidence(false)
        }

        if (showModalNotDelivered) {
            setShowModalNotDelivered(false);
        }
    }

    const closeModalMessage = () => {
        setShowModalMessage({ show: false, message: '' })
        navigation.goBack();
    }

    return (
        <SafeAreaView style={CustomerDayStyles.customerPrincipal}>
            <View style={[CustomerDayStyles.title2, { marginTop: Platform.OS === 'android' ? 10 : 0 }]}>
                <View style={{ marginRight: 20 }}>
                    <BtnGoBack color={colors.darkBlue} />
                </View>
                <Text style={CustomerDayStyles.customerTitle}>
                    {customer.accountName}
                </Text>
            </View>
            <View style={CustomerDayStyles.titleActionContainer}>
                <Text style={ProductStyles.tittleCard}>Order: {customer.orders_reference}</Text>
            </View>
            <View style={CustomerDayStyles.actionsContainer}>

                <TouchableOpacity
                    onPress={() => navigation.navigate('ProductsPage', { customer })}
                    style={[
                        ProductStyles.card,
                        GlobalStyles.boxShadow,
                        { justifyContent: 'center', alignItems: 'center' }
                    ]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <MaterialIcons style={{ marginRight: 10 }} name="list" size={35} color={colors.darkBlue} />
                        <Text style={ProductStyles.tittleCard}>Products</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={statusCustomer === true}
                    onPress={() => setShowModalEvidence(true)}
                    style={[
                        ProductStyles.card,
                        GlobalStyles.boxShadow,
                        {
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: statusCustomer === true ? colors.green : 'white'
                        }
                    ]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <MaterialIcons style={{ marginRight: 10 }} name="check" size={35} color={
                            statusCustomer === true ? 'white' : colors.darkBlue
                        } />
                        <Text style={[ProductStyles.tittleCard, {
                            color: statusCustomer === true ? 'white' : colors.darkBlue
                        }]}>
                            Delivered
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={statusCustomer === false}
                    onPress={() => setShowModalNotDelivered(true)}
                    style={[
                        ProductStyles.card,
                        GlobalStyles.boxShadow,
                        {
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: statusCustomer === false ? colors.danger : 'white'
                        }
                    ]}>
                    <MaterialIcons style={{ marginRight: 10 }} name="clear" size={35} color={
                        statusCustomer === false ? 'white' : colors.darkBlue
                    } />
                    <Text style={[ProductStyles.tittleCard, {
                        color: statusCustomer === false ? 'white' : colors.darkBlue
                    }]}>
                        Problems with my delivery
                    </Text>
                </TouchableOpacity>

                {specialInstructions ? (
                    <>
                        <Text style={[ProductStyles.tittleCard, { marginTop: 20, marginBottom: 10 }]}>Special instructions:</Text>
                        <Text style={ProductStyles.textCard}>{specialInstructions}</Text>
                    </>
                ) : null}

            </View>

            <ModalProduct
                showModal={showModalEvidence}
                title={`Order: ${customer.orders_reference}`}
                text={`To change the status of the order it is mandatory to send evidence.`}
                modalEvidence
                setEvidence={setEvidence}
                handleClose={handleClose}
                navigation={navigation}
                customer={customer}
            />

            <ModalProduct
                showModal={showModalNotDelivered}
                confirmNotDelivered={confirmNotDelivered}
                title={`Order: ${customer.orders_reference}`}
                text={`¿Are you sure you want to mark this order as not delivered?`}
                setNotes={setNotes}
                handleClose={handleClose}
            />


            <ModalMessage
                showModal={showModalMessage.show}
                closeModalMessage={closeModalMessage}
                title={`Order: ${customer.orders_reference}`}
                text="The order has been updated successfully"
            />

            <ModalLoading loading={loading} />

        </SafeAreaView>
    )
}
