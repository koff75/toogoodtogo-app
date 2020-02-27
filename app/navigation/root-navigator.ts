import { createStackNavigator } from "react-navigation"
import { PrimaryNavigator } from "./primary-navigator"
import {
  DetailScreen,
  TopRatingsScreen,
} from "../screens" // eslint-disable-line @typescript-eslint/no-unused-vars

export const RootNavigator = createStackNavigator(
  {
    primaryStack: { screen: PrimaryNavigator },
    detailScreen: { screen: DetailScreen },
    topRatingsScreen: { screen: TopRatingsScreen },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
