import React, { useEffect, useState } from 'react'
import { Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { CustomerDayStyles } from '../../styles/CustomerDayStyles'
import { BtnGoBack } from '../../components/BtnGoBack'
import { GlobalStyles, colors } from '../../styles/GlobalStyles'
import { ProductStyles } from '../../styles/ProductStyles'
import ModalProduct from '../../components/ModalProduct'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { useProductSubmit } from '../../hooks/useProductSubmit'

export const CustomerActions = ({ route }) => {

    const { customer } = route.params
    const navigation = useNavigation()
    const [showModalDelivered, setShowModalDelivered] = useState(false)
    const [showModalNotDelivered, setShowModalNotDelivered] = useState(false)
    const [showModalEvidence, setShowModalEvidence] = useState(false)
    const [evidence, setEvidence] = useState(null)
    const [especialInstructions, setEspecialInstructions] = useState('Loading...')

    const { getEspecialInstructions, handleSubmitCustomer } = useProductSubmit()

    const confirm = () => {
        if (showModalDelivered) {
            setShowModalDelivered(false)
            handleSubmitCustomer(customer.orders_reference, true, null);
            setShowModalEvidence(true)
        }

        if (showModalNotDelivered) {
            handleSubmitCustomer(customer.orders_reference, false, null);
        }

        setShowModalNotDelivered(false)
    }

    const getEspecialInstruction = async () => {
        try {
            const response = await getEspecialInstructions(customer.orders_reference)
            setEspecialInstructions(response)
        } catch (error) {
            console.error('Error al obtener las instrucciones especiales: ', error)
        }
    }

    useEffect(() => {
        if (evidence !== null) {
            handleSubmitCustomer(customer.orders_reference, null, evidence);
            setEvidence(null)
        }
    }, [evidence]);

    useEffect(() => {
        getEspecialInstruction()
    }, []);

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
                    onPress={() => setShowModalDelivered(true)}
                    style={[
                        ProductStyles.card,
                        GlobalStyles.boxShadow,
                        { justifyContent: 'center', alignItems: 'center' }
                    ]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <MaterialIcons style={{ marginRight: 10 }} name="check" size={35} color={colors.darkBlue} />
                        <Text style={ProductStyles.tittleCard}>Delivered</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setShowModalNotDelivered(true)}
                    style={[
                        ProductStyles.card,
                        GlobalStyles.boxShadow,
                        { justifyContent: 'center', alignItems: 'center' }
                    ]}>
                    <MaterialIcons style={{ marginRight: 10 }} name="clear" size={35} color={colors.darkBlue} />
                    <Text style={ProductStyles.tittleCard}>Not delivered</Text>
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
                setShowModal={setShowModalDelivered}
                confirm={confirm}
                title={`Order: ${customer.orders_reference}`}
                text={`¿Are you sure you want to mark this order as delivered?`}
            />

            <ModalProduct
                showModal={showModalNotDelivered}
                setShowModal={setShowModalNotDelivered}
                confirm={confirm}
                title={`Order: ${customer.orders_reference}`}
                text={`¿Are you sure you want to mark this order as not delivered?`}
            />

            <ModalProduct
                showModal={showModalEvidence}
                setShowModal={setShowModalEvidence}
                confirm={confirm}
                title={`Order: ${customer.orders_reference}`}
                text={`Select evidence to add to order.`}
                modalEvidence
                setEvidence={setEvidence}
            />

        </SafeAreaView>
    )
}
