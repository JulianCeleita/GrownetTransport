import { Feather, Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { colors } from '../styles/GlobalStyles'
import { SearchStyles } from '../styles/ProductStyles'
import { BtnGoBack } from './BtnGoBack'

function ProductSearcher({ setSearch, searchPhrase, setSearchPhrase }) {

  const handleClose = () => {
    setSearch(false)
    setSearchPhrase('')
  }

  return (
    <View style={[SearchStyles.view, { marginHorizontal: 10 }]}>
      <BtnGoBack color={colors.darkBlue} top={20} />
      <View style={SearchStyles.containerSearch}>
        <TextInput
          style={SearchStyles.BgInput}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
        />
        <TouchableOpacity style={SearchStyles.iconSearch}>
          <Feather name="search" size={20} color="#969696" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleClose}
        style={SearchStyles.iconClose}
      >
        <Ionicons
          name="close-circle-outline"
          size={38}
          color={colors.darkBlue}
        />
      </TouchableOpacity>
    </View>
  )
}

export default ProductSearcher
