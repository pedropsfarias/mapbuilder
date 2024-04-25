<template>
  <div id="map"></div>
</template>

<script lang="ts">
import maplibregl from 'maplibre-gl';
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {
    setTimeout(() => {
      const map = new maplibregl.Map({
        container: 'map', // container id
        style: 'style.json' // style URL
      });
    }, 10);
  },
  methods: {}
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
