import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons'
import useTokenStore from '../store/useTokenStore';
import useEmployeeStore from '../store/useEmployeeStore';

export const BtnCloseSession = ({ color, bottom = 10, right = 10 }) => {
    const { setToken } = useTokenStore()
    const { setEmployeeToken } = useEmployeeStore()

    const closeSession = () => {
        setToken('')
        setEmployeeToken('')
    }

    return (
        <View style={{ position: 'absolute', zIndex: 100, bottom, right }}>
            <Feather
                name="arrow-left"
                size={27}
                color={color}
                onPress={() => closeSession()}
            />
        </View>
    )
}
