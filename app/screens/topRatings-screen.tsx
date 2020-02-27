import * as React from "react"
import { observer } from "mobx-react-lite"
import { Button, Card, Icon } from "react-native-elements"
import { View, Image, ActivityIndicator, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { Header, Screen, Text, Wallpaper } from "../components"
import { color, spacing } from "../theme"
import { NavigationScreenProps } from "react-navigation"
import { RootStore, useStores } from "../models/root-store"
import { useState } from "react"
import { FlatList } from "react-native-gesture-handler"
import { Market } from "../models/root-store/market"




export interface TopRatingsScreenProps extends NavigationScreenProps<{}> {
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


export const TopRatingsScreen: React.FunctionComponent<TopRatingsScreenProps> = observer((props) => {
  const { markets, status2 } = useStores()
  const goBack = () => props.navigation.goBack(null)
  //markets.sort((a, b) => a.favorite_count - b.favorite_count); // For ascending sort

  return (
    <View style={FULL}>
    <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
      <Header 
        headerText="Liste complète classée" 
        style={HEADER} 
        titleStyle={HEADER_TITLE}
        leftIcon="back"
        onLeftPress={goBack}
      />
     {status2 == "pending" && <ActivityIndicator size="large"/> && <Text text="PENDING"/>}
     {status2 == "done" &&
      <FlatList
        data={markets.sort((a, b) => b.favorite_count - a.favorite_count)}
        renderItem={({item}) => {
          const m = item as Market
          return (
            <View>
              <Card
                title={m.name}
                image={{ uri: m.coverImg}}>
              <Text style={CONTENT} text={`NB Favoris: ${m.favorite_count} - NB restant: ${m.items_available}`} />

              <Button
                icon={<Icon name='code' color='#ffffff' />}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='VOIR' />
              </Card>
            </View>
          )
        }}
      />}
    </Screen>
    </View>

  )
})
