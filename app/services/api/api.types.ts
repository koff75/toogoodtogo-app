import { GeneralApiProblem } from "./api-problem"


type Badges = {
  all: {rating_group: string, percentage: number, user_count: number, month_count: number}
  amount: {rating_group: string, percentage: number, user_count: number, month_count: number}
  quality: {rating_group: string, percentage: number, user_count: number, month_count: number}
  service: {rating_group: string, percentage: number, user_count: number, month_count: number}
}

export interface Store {
  item_id?: string,
  badges?: Badges[],
  milestones?: { age?: string, number_meals?: string },
}
export interface Market {
  item_id: string,
  priceBefore: number,
  priceAfter: number,
  name: string,
  description?: string,
  favorite_count: number,
  // Inside Store.
  location: string,
  pickup_start?: string,
  pickup_end?: string,
  items_available: number,
  isFav: boolean,
  isNew: boolean,
  coverImg?: string,
  logoImg?: string,
  isSell: boolean,
  sold_out_at?: string,
  store_id: string,
}

export type GetMarketsResult = { kind: "ok"; markets: Market[] } | GeneralApiProblem
export type GetStoreResult = { kind: "ok"; store: Store[] } | GeneralApiProblem

//export type GetUserResult = { kind: "ok"; user: Market } | GeneralApiProblem
