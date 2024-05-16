<template>
  <RibbonGroupComponent title="Navegação" width="220px">
    <RibbonItemGroupComponent rows="2" cols="2">
      <Button
        @click="getCoordinates"
        label="Pontos"
        icon="fg-lg fg fg-poi-home-o"
        severity="secondary"
        outlined
        aria-label="Bookmark"
        class="w-100 h-100"
        :disabled="activeTool"
      />
    </RibbonItemGroupComponent>
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
export default {
  name: 'NavigationComponent',
  data() {
    return {
      resumeVisible: false,
      measure: null,
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
