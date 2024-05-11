<template>
  <div>
    LayerSwitcher Component
    <br />
    {{ message }}
  </div>
</template>

<script>
import MapSingleton from '@/classes/MapSingleton';
export default {
  name: 'LayerSwitcherComponent',
  data() {
    return {
      message: 'Hello from LayerSwitcherComponent',
      map: MapSingleton.getInstance().getMap()
    };
  },
  mounted() {
    this.getLayers();
  },
  methods: {
    getLayers() {
      // console.log(this.map);
      var layers = this.map.getStyle().layers;
      layers.forEach(function (layer) {
        console.log(layer.id); // Log the ID of each layer
      });
    }
  }
};
</script>

<style scoped></style>
