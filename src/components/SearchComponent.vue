<template>
  <AutoComplete
    v-model="selection"
    :suggestions="results"
    @complete="search"
    optionLabel="label"
    optionGroupLabel="label"
    optionGroupChildren="items"
    placeholder="Pesquisar..."
    ref="search"
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
import AdressProvider from '@/classes/search/AdressProvider';
import MapSingleton from '@/classes/MapSingleton';

export default {
  name: 'SearchComponent',
  data() {
    return {
      map: null,
      selection: null,
      results: null,
      time: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.map = MapSingleton.getInstance().getMap();
    }, 1000);
  },
  methods: {
    async search(value) {
      if (this.time) {
        clearTimeout(this.time);
      }

      this.time = setTimeout(async () => {
        if (!value.query) {
          this.results = [
            {
              label: 'Digite ao menos 3 caracteres...',
              items: []
            }
          ];
          return;
        }

        if (value.query.length < 3) {
          this.results = [
            {
              label: 'Digite ao menos 3 caracteres...',
              items: []
            }
          ];
          return;
        }
        const results = [];

        const coordsResult = CoordinateProvider.seach(value.query);
        if (coordsResult && coordsResult.length) {
          results.push({
            label: 'Ir para...',
            items: [...coordsResult]
          });
        }

        const addressResult = await AdressProvider.seach(value.query);
        if (addressResult && addressResult.length) {
          results.push({
            label: 'Locais',
            items: [...addressResult]
          });
        }

        this.results = results;
      }, 1500);
    },
    execute(item) {
      if (item.type == 'coordinates') {
        this.map.flyTo({
          center: [item.lng, item.lat],
          zoom: 16,
          speed: 2
        });
      } else if (item.type == 'address') {
        this.map.flyTo({
          center: [item.lng, item.lat],
          zoom: 16,
          speed: 2
        });
      }

      setTimeout(() => {
        this.selection = null;
        this.$refs.search.$el.querySelector('input').blur();
      }, 1000);
    }
  }
};
</script>

<style scoped></style>
