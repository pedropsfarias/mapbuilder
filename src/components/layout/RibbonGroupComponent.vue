<template>
  <div class="group">
    <div class="group-content">
      <div class="group-item group-item-fullline">
        <MultiSelect
          id="ms-cities"
          v-model="selectedCities"
          :options="cities"
          optionLabel="name"
          :maxSelectedLabels="3"
          class="w-full"
        
        />
      </div>
      <div class="group-item group-item-double">
        <Button
          label="Áreas"
          icon="pi pi-bookmark"
          severity="secondary"
          outlined
          aria-label="Bookmark"
        />
      </div>
      <div class="group-item group-item-double">
        <Button
          label="Áreas"
          icon="pi pi-bookmark"
          severity="secondary"
          outlined
          aria-label="Bookmark"
        />
      </div>

      <div class="group-item">
        <Button
          v-tooltip="'Distâncias'"
          icon="pi pi-bookmark"
          severity="secondary"
          outlined
          aria-label="Bookmark"
        />
      </div>

      <div class="group-item">
        <Button
          v-tooltip="'Coordenadas'"
          icon="pi pi-bookmark"
          severity="secondary"
          outlined
          aria-label="Bookmark"
        />
      </div>
      <div class="group-item">
        <Button
          v-tooltip="'Ângulos'"
          icon="pi pi-bookmark"
          severity="secondary"
          outlined
          aria-label="Bookmark"
        />
      </div>
      <div class="group-item">
        <Button
          v-tooltip="'Áreas'"
          icon="pi pi-bookmark"
          severity="secondary"
          outlined
          aria-label="Bookmark"
        />
      </div>
    </div>

    <div class="group-title">Medir</div>
  </div>
</template>

<script>
export default {
  name: 'RibbonGroupComponent',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectedCities: null,
      cities: [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
      ]
    };
  }
};
</script>

<style scoped>
.w-full {
  width: 100%;
}
.group {
  position: relative;
  width: 200px;
  height: 100%;
  border: 1px solid #e8e8e8;
  border-radius: 0.5rem;
}

.group-title {
  position: absolute;
  width: 100%;
  border-top: 1px solid #e8e8e8;
  font-size: 0.9rem;
  bottom: 0rem;
  left: 0;
  user-select: none;
  text-align: center;
  padding: 0.2rem 0;
  color: #334155;
}

.group-content {
  height: calc(100% - 1.5rem);
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 33.33% 33.33% 33.33%;
}

.group-item {
  padding: 0.4rem 0.5rem;
}

.group-item-double {
  grid-column: span 2;
}

.group-item-fullline {
  grid-column: span 4;
}

.p-button {
  width: 100%;
  padding: 0.2rem 0.5rem;
}

.p-multiselect {
  height: 1.8rem;
}

#ms-cities > div.p-multiselect-label-container > div {
  padding: 0rem 0.75rem !important;
}
</style>
