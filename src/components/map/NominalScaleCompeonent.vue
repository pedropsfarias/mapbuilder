<template>
  <div>
    {{ scale }}
  </div>
</template>

<script>
import MapSingleton from '@/classes/MapSingleton.js';

export default {
  data() {
    return {
      scale: '',
      map: null
    };
  },
  mounted() {
    this.map = MapSingleton.getInstance().getMap();
    this.map.on('zoom', this.getNominalScale);
    this.getNominalScale();
  },
  methods: {
    getNominalScale() {
      const zoom = this.map.getZoom();
      const resolution = (40075016.686 / 256) * Math.pow(2, -zoom); // resolução em metros/pixel
      const dpi = 96; // Dots per inch
      const mpp = 0.0254 / dpi; // meters per pixel
      const nominalScale = resolution / mpp;
      this.scale = `1:${Math.round(nominalScale)}`;
    }
  }
};
</script>

<style scoped></style>
