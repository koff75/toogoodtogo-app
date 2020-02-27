import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { types } from "@babel/core"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        Authorization: this.config.authorization,
      },
    })
  }

  /**
   * Gets a list of markets
   */
  async getCallApi(): Promise<Types.GetMarketsResult> {
    const DATA = {"origin":{"longitude":0000000,"latitude":0000000},"page_size":20,"radius":200,"favorites_only":false,"discover":false,"user_id":"0000000"}
    // make the api call
    //const response: ApiResponse<any> = await this.apisauce.get(``)
    // Minimum: radius + origin + radius not be null
    // If pb : react-native start --reset-cache
    const response: ApiResponse<any> = await this.apisauce.post(``, DATA)
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const verifValue = (value: any, type: string): any => {
      if(value === undefined) { 
        return value = "Pas de valeur"
      } else {
        if (type === "start") return value.start
        if (type === "end") return value.end
        if (type === "soldOut") return value.sold_out_at
        if (type === "coverImg") return value.current_url
        if (type === "logoImg") return value.current_url
      }
    }
    const convertMarket = (raw): Types.Market => ({
        item_id: raw.item.item_id,
        priceBefore: raw.item.price.minor_units,
        priceAfter: raw.item.value.minor_units,
        name: raw.display_name,
        description: raw.item.description,
        favorite_count: raw.item.favorite_count,
        // Inside Store.
        location: raw.store.store_location.address.address_line,
        pickup_start: verifValue(raw.pickup_interval, "start"),
        pickup_end: verifValue(raw.pickup_interval, "end"),
        sold_out_at: verifValue(raw.sold_out_at, "soldOut"),
        items_available: raw.items_available,
        isFav: raw.favorite,
        isNew: raw.new_item,
        coverImg: verifValue(raw.item.cover_picture, "coverImg"),
        logoImg: verifValue(raw.item.logo_picture, "coverImg"),
        isSell: raw.in_sales_window,
        store_id: raw.store.store_id,
    })
    // transform the data into the format we are expecting
    try {
      //console.tron.log("API.TS API", response.data)
      // Attention on sélectionne ici le champ objet de response.data
      // TIP: items correspond à la premiere clé de la request
      const {items} = response.data
      const resultMarkets: Types.Market[] = items.map(convertMarket)
      console.tron.log("CONVERSION MARKETS", resultMarkets)
      return { kind: "ok", markets: resultMarkets }
    } catch {
      console.tron.error("API.TS BAD DATA")
      return { kind: "bad-data" }
    }
  }


   /**
   * Gets details on one store
   */
  async getCallApiStore(storeId: string): Promise<Types.GetStoreResult> {
    const DATA = {"user_id":"0000000","origin":{"longitude":0000000,"latitude":0000000}}
    const response: ApiResponse<any> = await this.apisauce.post(`${storeId}/`, DATA)
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const verifValue = (value: any, type: string, n: number): any => {
      if(value === undefined) {
        if(type === "rating") return value = "Pas de valeur"
        else if(type === "age") return value = "Pas de valeur"
        else if(type === "number_meals") return value = "Pas de valeur"
        else return value = -1
      } else {
        if (type === "rating") {
          if (value[n] === undefined) return "Pas de valeur"
          else return value[n].rating_group
        }
        if (type === "percentage") {
          if (value[n] === undefined) return -1
          else return value[n].percentage
        }
        if (type === "user_count") {
          if (value[n] === undefined) return -1
          else return value[n].user_count
        }
        if (type === "month_count") {
          if (value[n] === undefined) return -1
          else return value[n].month_count
        }
        if (type === "age") {
          if (value[0] === undefined) return "Pas de valeur"
          else return value[0].value
        }
        if (type === "number_meals") {
          if (value[1] === undefined) return "Pas de valeur"
          else return value[1].value
        }
      }
    }
    const convertStore = (raw): Types.Store => ({
      item_id: raw.item.item_id,
      badges: [
        {all: { rating_group: verifValue(raw.badges, "rating", 0), percentage: verifValue(raw.badges, "percentage", 0), user_count: verifValue(raw.badges, "user_count", 0), month_count: verifValue(raw.badges, "month_count", 0)},
        amount: { rating_group: verifValue(raw.badges, "rating", 1), percentage: verifValue(raw.badges, "percentage", 1), user_count: verifValue(raw.badges, "user_count", 1), month_count: verifValue(raw.badges, "month_count", 1)},
        quality: { rating_group: verifValue(raw.badges, "rating", 2), percentage: verifValue(raw.badges, "percentage", 2), user_count: verifValue(raw.badges, "user_count", 2), month_count: verifValue(raw.badges, "month_count", 2)},
        service: { rating_group: verifValue(raw.badges, "rating", 3), percentage: verifValue(raw.badges, "percentage", 3), user_count: verifValue(raw.badges, "user_count", 3), month_count: verifValue(raw.badges, "month_count", 3)},
      }],
      milestones : { age: verifValue(raw.store.milestones, "age", 0), number_meals: verifValue(raw.store.milestones, "number_meals", 1) },
    })
    // transform the data into the format we are expecting
    try {
      // Give an array to the store, we need to use self.stores.replace() to the .action setStore
      // The pb with replace, it erase the previous one. Here, we use .clear() before
      // Give an object to the store, we need to use self.stores.push(), push() creates an array
      
      //const tab = new Array
      //tab.push(convertStore(response.data))
      //const resultMarkets: Types.Store[]  = tab
      const resultMarkets: Types.Store[]  = convertStore(response.data)
      console.tron.log("CONVERSION STORE", resultMarkets)
      return { kind: "ok", store: resultMarkets }
    } catch {
      console.tron.error("API.TS APISTORE BAD DATA")
      return { kind: "bad-data" }
    }
  }
 }
