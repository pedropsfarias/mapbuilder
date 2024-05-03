import { defineStore } from 'pinia'

export default defineStore('appStatus', {
  state: () => {
    return {
      _mapIsDone: false,
      _layoutIsDone: false
    }
  },
  actions: {
    setMapIsDone(value) {
      this._mapIsDone = value
    },
    setLayoutIsDone(value) {
      this._layoutIsDone = value
    }
  },
  getters: {
    appIsDone() {
      return this._mapIsDone && this._layoutIsDone
    },
    layoutIsDone() {
      return this._layoutIsDone
    }
  }
})
