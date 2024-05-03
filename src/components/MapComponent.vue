<template>
  <div id="map"></div>
</template>

<script>
import { mapStores } from 'pinia';
import appStatusStore from '@/stores/appStatusStore.js';
import MapSingleton from '@/classes/MapSingleton.js';
export default {
  components: {},
  data() {
    return {};
  },
  mounted() { },
  methods: {
    createMap() {

      console.log('createMap');

      MapSingleton.getInstance().initializeMap({ options: { zoom: 14, center: [-49.644602, -27.210800] } });

      this.appStatusStore.setMapIsDone(true);

    }
  },
  computed: {
    ...mapStores(appStatusStore),
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
