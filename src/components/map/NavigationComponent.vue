<template>
  <RibbonGroupComponent title="Navegação" width="180px">
    <RibbonItemGroupComponent rows="2" cols="1">
      <Button
        @click="goToHome"
        v-tooltip="'Ir para a posição inicial'"
        icon="fg-2x fg fg-poi-home-o"
        severity="secondary"
        outlined
        aria-label="Bookmark"
        class="w-100 h-100"
        style="height: 100% !important"
      />
    </RibbonItemGroupComponent>
  </RibbonGroupComponent>
</template>

<script>
import MapSingleton from '@/classes/MapSingleton.js';
export default {
  name: 'NavigationComponent',
  data() {
    return {
      map: MapSingleton.getInstance().getMap()
    };
  },
  mounted() {},
  methods: {
    goToHome() {
      const initialCenter = this.map.getStyle().center;
      const initialZoom = this.map.getStyle().zoom;
      this.map.flyTo({
        center: initialCenter,
        zoom: initialZoom,
        speed: 0.5
      });
    }
  }
};
</script>

<style scoped></style>
