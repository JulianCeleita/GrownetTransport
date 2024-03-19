import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'

export const BtnGoBack = ({ color }) => {
    const { goBack } = useNavigation()
    return (
        <View style={{ marginHorizontal: 5 }}>
            <Feather
                name="arrow-left"
                size={27}
                color={color}
                onPress={() => goBack()}
            />
        </View>
    )
}
