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

    try {
      window.map = new maplibregl.Map({
        container: 'map', // container id
        style: 'style.json', // style URL
      });
    } catch (error) {
      console.log(':)')
    }

  },
  methods: {}
};
</script>

<style>
#map {
  height: 100%;
  width: 100%;
  background-color: grey;
  border: none;
  padding: 0;
  margin: 0;
  /* overflow: hidden; */
}
</style>
