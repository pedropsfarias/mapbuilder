import { defineStore } from 'pinia';

export default defineStore('appStatus', {
  state: () => {
    return {
      _mapIsDone: false,
      _layoutIsDone: false
    };
  },
  actions: {
    setMapIsDone(value: boolean) {
      this._mapIsDone = value;
    },
    setLayoutIsDone(value: boolean) {
      this._layoutIsDone = value;
    }
  },
  getters: {
    appIsDone(): boolean {
      return this._mapIsDone && this._layoutIsDone;
    },
    layoutIsDone(): boolean {
      return this._layoutIsDone;
    }
  }
});
