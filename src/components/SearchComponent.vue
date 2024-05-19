<template>
  <AutoComplete
    v-model="selection"
    :suggestions="results"
    @complete="search"
    optionLabel="label"
    optionGroupLabel="label"
    optionGroupChildren="items"
    placeholder="Pesquisar..."
  >
    <template #optiongroup="slotProps">
      <div class="flex align-items-center country-item">
        <div>{{ slotProps.item.label }}</div>
      </div>
    </template>

    <template #item="slotProps">
      <div class="flex align-items-center">
        <div @click="execute(slotProps.item)">{{ slotProps.item.label }}</div>
      </div>
    </template>
  </AutoComplete>
</template>

<script>
import CoordinateProvider from '@/classes/search/CoordinateProvider';
import MapSingleton from '@/classes/MapSingleton';

export default {
  name: 'SearchComponent',
  data() {
    return {
      map: MapSingleton.getInstance().getMap(),
      selection: null,
      results: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.map = MapSingleton.getInstance().getMap();
    }, 1000);
  },
  methods: {
    search(value) {
      const results = [];

      const result = CoordinateProvider.seach(value.query);
      if (result && result.length) {
        results.push({
          label: 'Ir para...',
          items: [...result]
        });
      }

      this.results = results;
    },
    execute(item) {
      if (item.type == 'coordinates') {
        this.map.flyTo({
          center: [item.lng, item.lat],
          zoom: 16,
          speed: 2
        });
      }

      setTimeout(() => {
        this.selection = null;
      }, 100);
    }
  }
};
</script>

<style scoped></style>
