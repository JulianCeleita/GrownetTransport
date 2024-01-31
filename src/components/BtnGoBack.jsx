import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'

export const BtnGoBack = ({ color, top = 10, left = 10 }) => {
    const { goBack } = useNavigation()
    return (
        <View style={{ position: 'absolute', zIndex: 100, top, left }}>
            <Feather
                name="arrow-left"
                size={27}
                color={color}
                onPress={() => goBack()}
            />
        </View>
    )
}
