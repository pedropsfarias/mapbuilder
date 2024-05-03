<template>
  <div id="map"></div>
</template>

<script>
import { mapStores } from 'pinia';
import appStatusStore from '@/stores/appStatusStore.js';
import maplibregl from 'maplibre-gl';
export default {
  components: {},
  data() {
    return {};
  },
  mounted() { },
  methods: {
    createMap() {
      let map = new maplibregl.Map({
        container: 'map', // container id
        style: 'style.json' // style URL
      });

      this.app.map = map;

      window.map = map;
      this.appStatusStore.setMapIsDone(true);
    }
  },
  computed: {
    ...mapStores(appStatusStore)
  },
  watch: {
    appStatusStore: {
      handler: function (val) {
        if (val.layoutIsDone) {
          this.createMap();
        }
      },
      deep: true
    }
  }
};
</script>

<style>
#map {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #f0f0f0;
  border: none;
  padding: 0;
  margin: 0;
  /* overflow: hidden; */
}
</style>
