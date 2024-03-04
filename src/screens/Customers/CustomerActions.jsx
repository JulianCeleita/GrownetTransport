import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { BtnGoBack } from '../../components/BtnGoBack'
import ModalMessage from '../../components/ModalMessage'
import ModalProduct from '../../components/ModalProduct'
import { useProductSubmit } from '../../hooks/useProductSubmit'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { GlobalStyles, colors } from '../../styles/GlobalStyles'
import { ProductStyles } from '../../styles/ProductStyles'

export const CustomerActions = ({ route }) => {

    const { customer } = route.params
    const navigation = useNavigation()
    const [showModalDelivered, setShowModalDelivered] = useState(false)
    const [showModalEvidence, setShowModalEvidence] = useState(false)
    const [showModalNotDelivered, setShowModalNotDelivered] = useState(false)
    const [showModalMessage, setShowModalMessage] = useState({ show: false, message: '' })
    const [evidence, setEvidence] = useState(null)
    const [especialInstructions, setEspecialInstructions] = useState()
    const [notes, setNotes] = useState('')
    const [statusCustomer, setStatusCustomer] = useState(null)

    const { getEspecialInstructions, handleSubmitCustomer } = useProductSubmit()

    const confirm = async () => {
        if (showModalDelivered) {
            setShowModalDelivered(false)
            await handleSubmitCustomer(customer.orders_reference, true, null, null);
            setStatusCustomer('delivered')
            setShowModalEvidence(true)
        }

        if (showModalNotDelivered) {
            const { status, message } = await handleSubmitCustomer(customer.orders_reference, false, null, notes);
            setShowModalMessage({ show: status, message: message })
            setStatusCustomer('notDelivered')
            handleClose();
        }
    }

    const getEspecialInstruction = async () => {
        try {
            const response = await getEspecialInstructions(customer.orders_reference)
            setEspecialInstructions(response)
        } catch (error) {
            console.error('Error al obtener las instrucciones especiales: ', error)
        }
    }

    const submitEvidence = async () => {
        if (evidence !== null) {
            const { status, message } = await handleSubmitCustomer(customer.orders_reference, null, evidence, null);
            setShowModalMessage({ show: status, message: message })
            setEvidence(null)
        }
    }

    useEffect(() => {
        submitEvidence()
    }, [evidence]);

    useEffect(() => {
        getEspecialInstruction()
    }, []);

    const handleClose = () => {

        if (showModalDelivered) {
            setShowModalDelivered(false);
        }

        if (showModalEvidence) {
            setShowModalEvidence(false)
        }

        if (showModalNotDelivered) {
            setShowModalNotDelivered(false);
        }
    }

    return (
        <SafeAreaView style={CustomerDayStyles.customerPrincipal}>
            <BtnGoBack color={colors.darkBlue} top={Platform.OS === 'ios' ? 60 : 15} />
            <View style={CustomerDayStyles.title2}>
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
                    onPress={() => setShowModalDelivered(true)}
                    style={[
                        ProductStyles.card,
                        GlobalStyles.boxShadow,
                        {
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: customer.delivered === true
                                ? colors.green
                                : statusCustomer === 'delivered'
                                    ? colors.green
                                    : 'white'
                        }
                    ]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <MaterialIcons style={{ marginRight: 10 }} name="check" size={35} color={
                            customer.delivered === true
                                ? 'white'
                                : statusCustomer === 'delivered'
                                    ? 'white'
                                    : colors.darkBlue
                        } />
                        <Text style={[ProductStyles.tittleCard, {
                            color: customer.delivered === true
                                ? 'white'
                                : statusCustomer === 'delivered'
                                    ? 'white'
                                    : colors.darkBlue
                        }]}>
                            Delivered
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setShowModalNotDelivered(true)}
                    style={[
                        ProductStyles.card,
                        GlobalStyles.boxShadow,
                        {
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: customer.delivered === false
                                ? colors.danger
                                : statusCustomer === 'notDelivered'
                                    ? colors.danger
                                    : 'white'
                        }
                    ]}>
                    <MaterialIcons style={{ marginRight: 10 }} name="clear" size={35} color={
                        customer.delivered === false
                            ? 'white'
                            : statusCustomer === 'notDelivered'
                                ? 'white'
                                : colors.darkBlue
                    } />
                    <Text style={[ProductStyles.tittleCard, {
                        color: customer.delivered === false
                            ? 'white'
                            : statusCustomer === 'notDelivered'
                                ? 'white'
                                : colors.darkBlue
                    }]}>
                        Problems with my delivery
                    </Text>
                </TouchableOpacity>

                {especialInstructions ? (
                    <>
                        <Text style={[ProductStyles.tittleCard, { marginTop: 20, marginBottom: 10 }]}>Especial instructions:</Text>
                        <Text style={ProductStyles.textCard}>{especialInstructions}</Text>
                    </>
                ) : null}

            </View>

            <ModalProduct
                showModal={showModalDelivered}
                confirm={confirm}
                title={`Order: ${customer.orders_reference}`}
                text={`¿Are you sure you want to mark this order as delivered?`}
                handleClose={handleClose}
            />

            <ModalProduct
                showModal={showModalNotDelivered}
                confirm={confirm}
                title={`Order: ${customer.orders_reference}`}
                text={`¿Are you sure you want to mark this order as not delivered?`}
                setNotes={setNotes}
                handleClose={handleClose}
            />

            <ModalProduct
                showModal={showModalEvidence}
                confirm={confirm}
                title={`Order: ${customer.orders_reference}`}
                text={`Select evidence to add to order.`}
                modalEvidence
                setEvidence={setEvidence}
                handleClose={handleClose}
            />

            <ModalMessage
                showModal={showModalMessage.show}
                setShowModal={setShowModalMessage}
                title={`Order: ${customer.orders_reference}`}
                text="The order has been updated successfully"
            />

        </SafeAreaView>
    )
}
