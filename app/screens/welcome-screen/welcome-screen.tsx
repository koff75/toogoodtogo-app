import * as React from "react"
import { View, Image, ActivityIndicator, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { RootStore, useStores } from "../../models/root-store"
import { Market } from "../../models/root-store/market"
import { useState, useEffect } from "react"
import { FlatList } from "react-native-gesture-handler"
import { Card } from "react-native-elements"


const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
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
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const ALMOST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 26,
  fontStyle: "italic",
}
const BOWSER: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
  marginVertical: spacing[2],

}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

export interface WelcomeScreenProps extends NavigationScreenProps<{}> {
  rootStore: RootStore
}

export const WelcomeScreen: React.FunctionComponent<WelcomeScreenProps> = props => {
  const nextScreen = React.useMemo(() => () => props.navigation.navigate("favList"), [
    props.navigation,
  ])
  const ratingsScreen = React.useMemo(() => () => props.navigation.navigate("ratings"), [
    props.navigation,
  ])
  const badgesScreen = React.useMemo(() => () => props.navigation.navigate("badges"), [
    props.navigation,
  ])
  const rootStore = useStores()
  useEffect(() => {
    rootStore && rootStore.getApi()
    rootStore.setClearStore
  }, [])
  const {markets, status2} = rootStore


  return (
    <View style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerText="Classement ToodGoodToGo" style={HEADER} titleStyle={HEADER_TITLE} />
        <Text style={CONTENT} text={`Nombre de fav. : ${markets.length} items`} />
       {status2 == "pending" && <ActivityIndicator size="large"/> && <Text text="PENDING"/>}
       
       
       <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <Button
            testID="button-main"
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            text="MY FAV LIST"
            onPress={nextScreen}
            disabled={status2 !== "done"}
          />
          <Button
            testID="button-main"
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            text="TOP ALL FAV."
            onPress={ratingsScreen}
            disabled={status2 !== "done"}
          />
          <Button
            testID="button-main"
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            text="TOP BADGES"
            onPress={badgesScreen}
            disabled={status2 !== "done"}
          />
          <Button
            testID="button-main"
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            text="TOP RATES"
            onPress={nextScreen}
            disabled={status2 !== "done"}
          />
        </View>
      </SafeAreaView>
      </Screen>
    </View>
  )
}
