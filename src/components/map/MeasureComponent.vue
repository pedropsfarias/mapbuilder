<template>
  <RibbonGroupComponent title="Medidas" width="220px">
    <RibbonItemGroupComponent rows="1" cols="2">
      <Button
        @click="getCoordinates"
        label="Pontos"
        icon="fg-lg fg fg-multipoint"
        :severity="activeTool == 'coords' ? 'primary' : 'secondary'"
        :outlined="activeTool != 'coords'"
        aria-label="Bookmark"
        class="w-100"
        :disabled="activeTool"
      />
    </RibbonItemGroupComponent>

    <RibbonItemGroupComponent rows="1" cols="2">
      <Button
        @click="getDistance"
        label="Distância"
        icon="fg-lg fg fg-polyline-pt"
        :severity="activeTool == 'distance' ? 'primary' : 'secondary'"
        :outlined="activeTool != 'distance'"
        aria-label="Bookmark"
        class="w-100"
        :disabled="activeTool"
      />
    </RibbonItemGroupComponent>

    <RibbonItemGroupComponent rows="1" cols="2">
      <Button
        @click="getArea"
        label="Áreas"
        icon="fg-lg fg fg-polygon-pt"
        :severity="activeTool == 'area' ? 'primary' : 'secondary'"
        :outlined="activeTool != 'area'"
        aria-label="Bookmark"
        class="w-100"
        :disabled="activeTool"
      />
    </RibbonItemGroupComponent>

    <RibbonItemGroupComponent rows="1" cols="2">
      <Button
        @click="getAzimuth"
        label="Azimute"
        icon="fg-lg fg fg-azimuth"
        :severity="activeTool == 'azimuth' ? 'primary' : 'secondary'"
        :outlined="activeTool != 'azimuth'"
        aria-label="Bookmark"
        class="w-100"
        :disabled="activeTool"
      />
    </RibbonItemGroupComponent>

    <RibbonItemGroupComponent rows="1" cols="1">
      <Button
        @click="clear"
        v-tooltip.bottom="'Limpar'"
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
    <div v-if="resume.length == 0">Nenhuma medida realizada</div>
    <div v-for="(r, i) in resume" :key="i">
      <div>
        <b>{{ r.title }}</b> <br />
        {{ r.items }}<br />
        <div v-if="r.total">Total: {{ r.total }}</div>
      </div>
      <Divider />
    </div>
    <Button
      v-if="resume.length > 0"
      @click="clear"
      label="Limpar"
      icon="pi pi-eraser"
      severity="secondary"
      outlined
    />
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
      resume: [],
      activeTool: null
    };
  },
  mounted() {},
  methods: {
    async getCoordinates() {
      this.activeTool = 'coords';
      this.measures.push(await this.measure.getCoordinates());
      this.buildResume();
      this.activeTool = null;
    },
    async getDistance() {
      this.activeTool = 'distance';
      this.measures.push(await this.measure.getDistance());
      this.buildResume();
      this.activeTool = null;
    },
    async getArea() {
      this.activeTool = 'area';
      this.measures.push(await this.measure.getArea());
      this.buildResume();
      this.activeTool = null;
    },
    async getAzimuth() {
      this.activeTool = 'azimuth';
      this.measures.push(await this.measure.getAzimuth());
      this.buildResume();
      this.activeTool = null;
    },
    clear() {
      this.measure.clear();
      this.measures = [];
      this.resume = [];
    },
    buildResume() {
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
    },
    showResume() {
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
