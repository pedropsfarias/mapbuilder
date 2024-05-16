<template>
  <div>
    <Button
      @click="zoom"
      :icon="icon"
      v-tooltip="`${tip}`"
      severity="secondary"
      class="map-btn"
      text
      raised
    />
  </div>
</template>

<script>
import MapSingleton from '@/classes/MapSingleton.js';
export default {
  name: 'ZoomComponent',
  props: {
    direction: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      icon: this.direction === '1' ? 'pi pi-plus' : 'pi pi-minus',
      tip: this.direction === '1' ? 'Aproximar' : 'Afastar'
    };
  },
  methods: {
    zoom() {
      const map = MapSingleton.getInstance().getMap();
      if (this.direction === '1') {
        map.zoomIn();
      } else {
        map.zoomOut();
      }
    }
  }
};
</script>

<style scoped>
.map-btn {
  background: #fff;
}
</style>
