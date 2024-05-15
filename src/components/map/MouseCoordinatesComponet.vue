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
    const map = MapSingleton.getInstance().getMap();
    map.on('mousemove', (evt) => {
      const coord = [evt.lngLat.lng, evt.lngLat.lat];
      this.coordinates = gd2dms(coord);
    });

    this.coordinates = gd2dms([map.getCenter().lng, map.getCenter().lat]);
  }
};
</script>

<style scoped></style>
