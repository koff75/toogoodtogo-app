import { Instance, SnapshotOut, types, getEnv } from "mobx-state-tree"
import { NavigationStoreModel } from "../../navigation/navigation-store"
import { MarketModel, StoreModel, MarketSnapshot, StoreSnapshot } from "./market"
import { StatefulNavigator } from "../../navigation"
import { withStatus, withEnvironment } from "../extensions/"
import { Store } from "../../services/api"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  navigationStore: types.optional(NavigationStoreModel, {}),
  markets: types.array(MarketModel),
  stores: types.array(StoreModel),
  status2: types.optional(types.enumeration(["pending", "loading", "done", "error"]), "pending"),
})
.extend(withStatus)
.extend(withEnvironment)
.actions(self => ({
  setMarkets: (markets: MarketSnapshot[]) => {
    self.markets.replace(markets as any)
    // We pass one time through store, so delete all items
    self.stores.clear()
    console.tron.log("PUSH SETMARKETS", self.markets)
  },
  setStatus2: () => (self.status2 = "done"),
}))
.actions(self => ({
  setClearStore: () => {
    self.stores.clear()
    console.tron.log("STORE CLEARED", self.stores)
  }
}))
.actions(self => ({
  setStores: (stores: StoreSnapshot[]) => {
    self.stores.push(stores as any)
    console.tron.log("PUSH SETSTORE", self.stores)
  },
  setStatus2: () => (self.status2 = "done"),
}))
.actions(self => ({
  getApi: () => {
    self.status = "pending"
    self.status2 = "pending"
    getEnv(self)
      .api.getCallApi()
      //markets: kind: "ok", markets: array(872)
      .then(({markets}) => {
        console.tron.log("NB MARKETS", markets)
        if(markets.length > 0) {
          console.tron.log("RETOUR API VERS MARKETS", markets)
          self.setMarkets(markets)
        } else {
          console.tron.log("root-store: no market")
        }
        self.setStatus2()
        self.setStatus("done")
      }, 3000)
  },
}))
.actions(self => ({
  getApiStore: () => {
    self.status = "pending"
    self.status2 = "pending"
    self.markets.map((item) => {
      getEnv(self)
        //"30501i2603579" 52104i2643100
        .api.getCallApiStore(item.item_id)
        .then(({store}) => {
          if(1 === 1) {
            // Put the object into an array
            // useful to call the replace method
            //const stores = new Array
            //self.storesTemp.push(store)
            console.tron.log("RETOUR API VERS STORE", store)
            self.setStores(store)
          } else {
            console.tron.log("2 root-store: no market")
          }
          self.setStatus2()
          self.setStatus("done")
        }, 3000)
    })
  },
}))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
