import { API_URL } from "react-native-dotenv"

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number

  // For the bearer token authorization
  authorization: string
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL || "https://apptoogoodtogo.com/api/item/v3/",
  timeout: 10000,
  authorization: "Bearer [YOUR KEY HERE]"
}
