<template>
  <RibbonGroupComponent title="Medidas" width="220px">
    <RibbonItemGroupComponent rows="1" cols="2">
      <Button
        @click="getCoordinates"
        label="Pontos"
        icon="fg-lg fg fg-multipoint"
        severity="secondary"
        outlined
        aria-label="Bookmark"
        class="w-100"
      />
    </RibbonItemGroupComponent>

    <RibbonItemGroupComponent rows="1" cols="2">
      <Button
        @click="getDistance"
        label="Distância"
        icon="fg-lg fg fg-polyline-pt"
        severity="secondary"
        outlined
        aria-label="Bookmark"
        class="w-100"
      />
    </RibbonItemGroupComponent>

    <RibbonItemGroupComponent rows="1" cols="2">
      <Button
        @click="getArea"
        label="Áreas"
        icon="fg-lg fg fg-polygon-pt"
        severity="secondary"
        outlined
        aria-label="Bookmark"
        class="w-100"
      />
    </RibbonItemGroupComponent>

    <RibbonItemGroupComponent rows="1" cols="2">
      <Button
        @click="getAzimuth"
        label="Azimute"
        icon="fg-lg fg fg-azimuth"
        severity="secondary"
        outlined
        aria-label="Bookmark"
        class="w-100"
      />
    </RibbonItemGroupComponent>

    <RibbonItemGroupComponent rows="1" cols="1">
      <Button
        @click="clear"
        v-tooltip.bottom="'Apagar'"
        icon="pi pi-eraser"
        class="w-100"
        severity="secondary"
        outlined
      />
    </RibbonItemGroupComponent>

    <RibbonItemGroupComponent rows="1" cols="1">
      <Button
        @click="showResume"
        v-tooltip.bottom="'Ver resumo'"
        icon="pi pi-list"
        class="w-100"
        severity="secondary"
        outlined
      />
    </RibbonItemGroupComponent>

    <!-- <RibbonItemGroupComponent title="Testes" rows="1" cols="4">
            <MultiSelect v-model="selectedCities" :options="cities" optionLabel="name" :maxSelectedLabels="3"
                class="w-full" />
        </RibbonItemGroupComponent> -->
  </RibbonGroupComponent>

  <Dialog v-model:visible="resumeVisible" header="Medidas" :style="{ width: '25rem' }">
    <div v-for="(r, i) in resume" :key="i">
      <h5>{{ r.title }}</h5>
      <p>{{ r.items }}</p>
      <p v-if="r.total">{{ r.total }}</p>
    </div>
  </Dialog>
</template>

<script>
import Measure from '@/classes/map/Measure.js';

export default {
  name: 'MeasureComponent',
  data() {
    return {
      resumeVisible: false,
      measure: new Measure(),
      measures: [],
      resume: []
    };
  },
  mounted() {},
  methods: {
    async getCoordinates() {
      this.measures.push(await this.measure.getCoordinates());
      console.log(this.measures);
    },
    async getDistance() {
      this.measures.push(await this.measure.getDistance());
    },
    async getArea() {
      this.measures.push(await this.measure.getArea());
    },
    async getAzimuth() {
      this.measures.push(await this.measure.getAzimuth());
    },
    clear() {
      this.measure.clear();
      this.measures = [];
    },
    showResume() {
      this.resume = [];
      for (let i = 0; i < this.measures.length; i++) {
        if (this.measures[i].type == 'FeatureCollection') {
          const props = [];
          for (let j = 0; j < this.measures[i].features.length; j++) {
            props.push(this.measures[i].features[j].properties);
          }
          this.resume.push({
            title: this._getTitle(this.measures[i].features[0].properties),
            items: props.map((p) => p.label).join(', '),
            total: this.measures[i].features[0].properties.total
          });
        } else {
          this.resume.push({
            title: this._getTitle(this.measures[i].properties),
            items: this.measures[i].properties.label
          });
        }
      }

      this.resumeVisible = true;
    },
    _getTitle(measure) {
      switch (measure.measureType) {
        case 'coords':
          return 'Coordenadas';
        case 'distance':
          return 'Distância';
        case 'area':
          return 'Área';
        case 'azimuth':
          return 'Azimute';
      }
    }
  }
};
</script>

<style scoped></style>
