import * as React from "react"
import { observer } from "mobx-react-lite"
import { Button, Card, Icon } from "react-native-elements"
import { View, Image, ActivityIndicator, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { Header, Screen, Text, Wallpaper } from "../components"
import { color, spacing } from "../theme"
import { NavigationScreenProps } from "react-navigation"
import { RootStore, useStores } from "../models/root-store"
import { useState, useEffect } from "react"
import { FlatList } from "react-native-gesture-handler"
import { Market, Store } from "../models/root-store/market"




export interface TopPourcentScreenProps extends NavigationScreenProps<{}> {
  rootStore: RootStore
}


const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.black,
  fontFamily: "Montserrat",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: color.primary,
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}


export const TopPourcentScreen: React.FunctionComponent<TopPourcentScreenProps> = observer((props) => {

  const rootStore = useStores()
  useEffect(() => {
    rootStore && rootStore.getApiStore()
  }, [])
  const {markets, status2, stores} = rootStore

  const goBack = () => props.navigation.goBack(null)
  //markets.sort((a, b) => a.favorite_count - b.favorite_count); // For ascending sort

  return (
    <View style={FULL}>
    <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
      <Header 
        headerText="Classement par badges" 
        style={HEADER} 
        titleStyle={HEADER_TITLE}
        leftIcon="back"
        onLeftPress={goBack}
      />
     {status2 == "pending" && <ActivityIndicator size="large"/> && <Text text="PENDING"/>}
     {status2 == "done" &&
      <FlatList
        data={stores}
        renderItem={({item}) => {
          const m = item as Store
          return (
            <View>
              <Text style={CONTENT} text={`NB Favoris: ${m.milestones.number_meals}`} />
            </View>
          )
        }}
      />}
    </Screen>
    </View>

  )
})
