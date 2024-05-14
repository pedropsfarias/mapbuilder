<template>
  <div>
    <Tree
      ref="layers"
      v-model:selectionKeys="selectedKey"
      :value="nodes"
      :filter="true"
      filterMode="lenient"
      filterPlaceholder="Procurar por camadas..."
      @update:selectionKeys="onSelectionChange"
      selectionMode="checkbox"
      class="w-full md:w-30rem"
    ></Tree>
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
      selectedKey: {}
    };
  },
  mounted() {
    this.getLayers();
  },
  methods: {
    getLayers() {
      const map = MapSingleton.getInstance().getMap();
      const groups = map.getStyle().metadata['groups'];

      const nodes = [];
      groups.forEach((group) => {
        nodes.push({
          key: `#${group.id}`,
          label: group.name,
          data: group,
          icon: 'pi pi-fw pi-folder',
          children: this.buildNode(group)
        });
      });
      this.nodes = nodes;
      this.updateParentNodes(this.nodes);
    },
    buildNode(node) {
      let nodes = [];
      if (node.children) {
        node.children.forEach((child) => {
          nodes.push({
            key: `#${child.id}`,
            label: child.name,
            data: child,
            icon: 'pi pi-fw pi-folder',
            children: this.buildNode(child)
          });
          this.selectedKey[`#${child.id}`] = { checked: false, partialChecked: false };
        });
      }
      this.selectedKey[`#${node.id}`] = { checked: false, partialChecked: false };
      const layersNodes = this.buildLayersNode(node.id);
      nodes = nodes.concat(layersNodes);
      return nodes;
    },
    buildLayersNode(nodeId) {
      const map = MapSingleton.getInstance().getMap();
      const layers = map.getStyle().layers;
      const nodes = [];
      layers.forEach((layer) => {
        if (layer.metadata && layer.metadata['group'] === nodeId) {
          nodes.push({
            key: layer.id,
            label: layer.metadata.name,
            data: layer
          });
          this.selectedKey[layer.id] = { checked: layer.metadata.enabled, partialChecked: false };
        }
      });
      return nodes;
    },
    updateParentNodes(nodes) {
      nodes.forEach((node) => {
        if (node.children) {
          this.updateParentNodes(node.children);
          let allChecked = true;
          let someChecked = false;
          node.children.forEach((child) => {
            if (this.selectedKey[child.key]) {
              if (!this.selectedKey[child.key].checked) {
                allChecked = false;
              } else {
                someChecked = true;
              }
            } else {
              allChecked = false;
            }
          });
          if (allChecked) {
            this.selectedKey[node.key] = { checked: true, partialChecked: false };
          } else if (someChecked) {
            this.selectedKey[node.key] = { checked: false, partialChecked: true };
          } else {
            this.selectedKey[node.key] = { checked: false, partialChecked: false };
          }
        }
      });
    },
    onSelectionChange(selections) {
      const map = MapSingleton.getInstance().getMap();
      const layers = map.getStyle().layers;

      layers.forEach((layer) => {
        if (layer.id.startsWith('_')) return;
        if (selections[layer.id]) {
          map.setLayoutProperty(layer.id, 'visibility', 'visible');
        } else {
          map.setLayoutProperty(layer.id, 'visibility', 'none');
        }
      });
    }
  }
};
</script>

<style scoped></style>
