# Unofficial React Native app for TooGoodToGo

**React Native project using TypeScript, MobX State Tree (MST) and React Navigation.**

You can find all your favorites stores with more information (number of likes, etc.), the top-ranking stores, top-ranking badges, top-ranking rates.

## How to configure
API URL can be found in ".env" file.
Go to "**app/services/api-config.ts**"
Add your authorization key (bearer) by using PostMan or Burp software as man-in-the-middle.

    /**
     * The default configuration for the app.
     */
    export const DEFAULT_API_CONFIG: ApiConfig = {
      url: API_URL || "https://apptoogoodtogo.com/api/item/v3/",
      timeout: 10000,
      authorization: "Bearer [YOUR KEY HERE]"

Go to "**app/services/api.ts**"
Add your ID and GPS informations (using the same soft as below).
Line **56**:

    const DATA = {"origin":{"longitude":0000000,"latitude":0000000},"page_size":20,"radius":200,"favorites_only":false,"discover":false,"user_id":"0000000"}

Line **118**:

      async getCallApiStore(storeId: string): Promise<Types.GetStoreResult> {
        const DATA = {"user_id":"0000000","origin":{"longitude":0000000,"latitude":0000000}}


## How to install
Just run the command "**react-native run-ios**" if you're on iOS.
Only tested with iOS, should perfectly work on Android.

![](https://media.giphy.com/media/JO9cuGO03vHKPFc15I/giphy.gif)

Enjoy ;)
