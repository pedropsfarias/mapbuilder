<template>
  <div id="map">
    <div class="map-footer">
      <div v-for="(component, i) in components" :key="i" class="map-footer-info">
        <component :is="component" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import appStatusStore from '@/stores/appStatusStore.js';
import MapSingleton from '@/classes/MapSingleton.js';
import MouseCoordinatesComponet from './map/MouseCoordinatesComponet.vue';
import NominalScaleCompeonent from './map/NominalScaleCompeonent.vue';
import GraphicalScaleComponent from './map/GraphicalScaleComponent.vue';
import { markRaw } from 'vue';
export default {
  components: {
    MouseCoordinatesComponet,
    NominalScaleCompeonent,
    GraphicalScaleComponent
  },
  data() {
    return {
      footerComponents: [
        markRaw(MouseCoordinatesComponet),
        markRaw(NominalScaleCompeonent),
        markRaw(GraphicalScaleComponent)
      ],
      components: []
    };
  },
  mounted() {},
  methods: {
    createMap() {
      console.log('createMap');

      MapSingleton.getInstance().initializeMap({
        options: { zoom: 14, center: [-49.644602, -27.2108] }
      });

      this.appStatusStore.setMapIsDone(true);
      this.components = this.footerComponents;
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
.map-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 18px;
  display: flex;
  justify-content: right;
  align-items: right;
  padding: 0 5px;
}

.map-footer-info {
  height: 16px;
  padding: 0 10px;
  border-radius: 1rem;
  font-size: 10px;
  background: #fff;
  line-height: 16px;
  user-select: none;
  margin: 0 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
</style>
