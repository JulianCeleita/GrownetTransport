import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { BtnCloseSession } from '../../components/BtnCloseSession'
import { colors } from '../../styles/GlobalStyles'

export const ShortsVanPage = () => {
    return (
        <SafeAreaView>
            <Text>ShortsVan Page</Text>
            <BtnCloseSession color={colors.bluePrimary} />
        </SafeAreaView>
    )
}
