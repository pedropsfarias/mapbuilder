<template>
  <div>
    <Tree
      ref="layers"
      v-model:selectionKeys="selectedKeys"
      v-model:expandedKeys="expandedKeys"
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
      selectedKeys: {},
      expandedKeys: {}
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
      for (let i = groups.length - 1; i >= 0; i--) {
        const group = groups[i];
        nodes.push({
          key: `#${group.id}`,
          label: group.name,
          data: group,
          icon: 'pi pi-fw pi-folder',
          children: this.buildNode(group)
        });
      }

      this.nodes = nodes;
      this.updateParentNodes(this.nodes);
    },
    buildNode(node) {
      let nodes = [];
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          const child = node.children[i];
          nodes.push({
            key: `#${child.id}`,
            label: child.name,
            data: child,
            icon: 'pi pi-fw pi-folder',
            children: this.buildNode(child)
          });
          this.selectedKeys[`#${child.id}`] = { checked: false, partialChecked: false };
          this.expandedKeys[`#${child.id}`] = !child.collapsed;
        }
      }
      this.selectedKeys[`#${node.id}`] = { checked: false, partialChecked: false };
      this.expandedKeys[`#${node.id}`] = !node.collapsed;
      const layersNodes = this.buildLayersNode(node.id);
      nodes = nodes.concat(layersNodes);
      return nodes;
    },
    buildLayersNode(nodeId) {
      const map = MapSingleton.getInstance().getMap();
      const layers = map.getStyle().layers;
      const nodes = [];
      for (let i = layers.length - 1; i >= 0; i--) {
        const layer = layers[i];
        if (layer.metadata && layer.metadata['group'] === nodeId) {
          nodes.push({
            key: layer.id,
            label: layer.metadata.name,
            data: layer
          });
          this.selectedKeys[layer.id] = { checked: layer.metadata.enabled, partialChecked: false };
        }
      }
      return nodes;
    },
    updateParentNodes(nodes) {
      nodes.forEach((node) => {
        if (node.children) {
          this.updateParentNodes(node.children);
          let allChecked = true;
          let someChecked = false;
          node.children.forEach((child) => {
            if (this.selectedKeys[child.key]) {
              if (!this.selectedKeys[child.key].checked) {
                allChecked = false;
              } else {
                someChecked = true;
              }
            } else {
              allChecked = false;
            }
          });
          if (allChecked) {
            this.selectedKeys[node.key] = { checked: true, partialChecked: false };
          } else if (someChecked) {
            this.selectedKeys[node.key] = { checked: false, partialChecked: true };
          } else {
            this.selectedKeys[node.key] = { checked: false, partialChecked: false };
          }
        }
      });
    },
    onSelectionChange(selections) {
      const map = MapSingleton.getInstance().getMap();
      const layers = map.getStyle().layers;
      layers.forEach((layer) => {
        if (layer.id.startsWith('_')) return;
        const selection = selections[layer.id] || {};
        const enabled = selection.checked || false;
        const value = enabled ? 'visible' : 'none';
        map.setLayoutProperty(layer.id, 'visibility', value);
      });
    }
  }
};
</script>

<style scoped></style>
