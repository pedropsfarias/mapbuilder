<template>
  <div>
    <Tree ref="layers" v-model:selectionKeys="selectedKey" :value="nodes" :filter="true" filterMode="lenient"
      selectionMode="checkbox" class="w-full md:w-30rem"></Tree>
  </div>
</template>

<script>
import MapSingleton from '@/classes/MapSingleton';
export default {
  name: 'LayerSwitcherComponent',
  data() {
    return {
      message: 'Hello from LayerSwitcherComponent',
      nodes: [],
      selectedKey: {},
      aselectedKey: {}

    };
  },
  mounted() {
    this.getLayers();
  },
  methods: {
    getLayers() {

      setTimeout(() => {
        const map = MapSingleton.getInstance().getMap();
        const groups = map.getStyle().metadata['groups'];

        const nodes = [];
        groups.forEach(group => {
          nodes.push({
            key: group.id,
            label: group.name,
            data: group,
            icon: 'pi pi-fw pi-folder',
            children: this.buildNode(group)
          });
        });
        this.nodes = nodes;
        this.selectedKey = this.aselectedKey;
        console.log(this.$refs.layers)
      }, 2000)

    },
    buildNode(node) {
      let nodes = [];
      if (node.children) {
        node.children.forEach(child => {
          nodes.push({
            key: child.id,
            label: child.name,
            data: child,
            icon: 'pi pi-fw pi-folder',
            children: this.buildNode(child)
          });
        });
      }
      const layersNodes = this.buildLayersNode(node.id);
      nodes = nodes.concat(layersNodes);
      return nodes;
    },
    buildLayersNode(nodeId) {
      const map = MapSingleton.getInstance().getMap();
      const layers = map.getStyle().layers;
      const nodes = [];
      layers.forEach(layer => {
        if (layer.metadata && layer.metadata['group'] === nodeId) {
          nodes.push({
            key: layer.id,
            label: layer.metadata.name,
            data: layer,
            icon: 'pi pi-fw pi-clone',
          });
          this.aselectedKey[layer.id] = { checked: layer.metadata.enabled, partialChecked: false };
        }
      });
      return nodes;
    },
  },
  watch: {
    selectedKey: function (val) {
      // console.log(val);
    }
  }
};
</script>

<style scoped></style>
