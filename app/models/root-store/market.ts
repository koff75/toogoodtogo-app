import { types } from "mobx-state-tree"
import type from "ramda/es/type"


// ------------
export const BadgesModel = types.model ({
    all: types.model({rating_group: types.string, percentage: types.number, user_count: types.number, month_count: types.number}),
    amount: types.model({rating_group: types.string, percentage: types.number, user_count: types.number, month_count: types.number}),
    quality: types.model({rating_group: types.string, percentage: types.number, user_count: types.number, month_count: types.number}),
    service: types.model({rating_group: types.string, percentage: types.number, user_count: types.number, month_count: types.number}),
})
// ------------


export const MarketModel = types.model({
    // tid: types.number,
    // name: types.string,
    // college: types.string,
    // injury: types.maybe(types.model({ type: types.string, gamesRemaining: types.number }))
    
    // Inside Item.
    item_id: types.string, //types.reference(StoreModel),
    priceBefore: types.number,
    priceAfter: types.number,
    name: types.string,
    description: types.maybe(types.string),
    favorite_count: types.number,
    // Inside Store.
    location: types.string,
    pickup_start: types.maybe(types.string),
    pickup_end: types.maybeNull(types.string),
    items_available: types.number,
    isFav: types.optional(types.boolean, false),
    isNew: types.optional(types.boolean, false),
    coverImg: types.maybeNull(types.string),
    coverLogo: types.maybe(types.string),
    isSell: types.optional(types.boolean, false),
    sold_out_at: types.maybe(types.string),
    //store_id: types.reference(StoreModel),
    // Manque le ratio /5


})
export const StoreModel = types.model({
    item_id: types.reference(MarketModel), //types.maybe(types.string),
    badges: types.maybe(types.array(BadgesModel)),
    milestones: types.model({ age: types.string, number_meals: types.string }),
})

// Ensuite faire une référence vers au autre model genre TEAM

export type Market = typeof MarketModel.Type
export type MarketSnapshot = typeof MarketModel.SnapshotType

export type Store = typeof StoreModel.Type
export type StoreSnapshot = typeof StoreModel.SnapshotType