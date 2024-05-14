<template>
  <div>{{ coordinates }}</div>
</template>

<script>
import MapSingleton from '@/classes/MapSingleton.js';
import { gd2dms } from '@/helpers/coords.js';
export default {
  data() {
    return {
      coordinates: ''
    };
  },
  mounted() {
    MapSingleton.getInstance()
      .getMap()
      .on('mousemove', (evt) => {
        const coord = [evt.lngLat.lng, evt.lngLat.lat];
        this.coordinates = gd2dms(coord);
      });
  }
};
</script>

<style scoped></style>
