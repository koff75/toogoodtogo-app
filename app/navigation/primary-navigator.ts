import createNativeStackNavigator from "react-native-screens/createNativeStackNavigator"
import {
  WelcomeScreen,
  DemoScreen,
  DetailScreen,
  TopRatingsScreen,
  TopPourcentScreen,
} from "../screens"

export const PrimaryNavigator = createNativeStackNavigator(
  {
    welcome: { screen: WelcomeScreen },
    demo: { screen: DemoScreen },
    favList: { screen: DetailScreen }, // number of stars with fav = 1
    ratings: {screen: TopRatingsScreen }, // number of stars all content
    badges: {screen: TopPourcentScreen },
  },
  {
    headerMode: "none",
  },
)

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["welcome"]
