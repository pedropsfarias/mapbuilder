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
    var map = new maplibregl.Map({
      container: 'map', // container id
      style: 'https://demotiles.maplibre.org/style.json', // style URL
      center: [0, 0], // starting position [lng, lat]
      zoom: 1 // starting zoom
    });
  },
  methods: {}
};
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
  background-color: grey;
  border-radius: 0.5rem;
  overflow: hidden;
}
</style>
