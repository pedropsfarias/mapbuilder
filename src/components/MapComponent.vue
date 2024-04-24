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
      var map = new maplibregl.Map({
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

<style scoped>
#map {
  height: 100%;
  width: 100%;
  background-color: grey;
  border-radius: 0.5rem;
  overflow: hidden;
}
</style>
