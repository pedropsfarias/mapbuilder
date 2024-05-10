<template>
  <RibbonGroupComponent title="Medidas" width="220px">
    <RibbonItemGroupComponent rows="1" cols="2">
      <Button @click="getCoordinates" label="Pontos" icon="fg-lg fg fg-multipoint" severity="secondary" outlined
        aria-label="Bookmark" class="w-100" />
    </RibbonItemGroupComponent>

    <RibbonItemGroupComponent rows="1" cols="2">
      <Button @click="getDistance" label="Distância" icon="fg-lg fg fg-polyline-pt" severity="secondary" outlined
        aria-label="Bookmark" class="w-100" />
    </RibbonItemGroupComponent>

    <RibbonItemGroupComponent rows="1" cols="2">
      <Button @click="getArea" label="Áreas" icon="fg-lg fg fg-polygon-pt" severity="secondary" outlined
        aria-label="Bookmark" class="w-100" />
    </RibbonItemGroupComponent>

    <RibbonItemGroupComponent rows="1" cols="2">
      <Button @click="getAzimuth" label="Azimute" icon="fg-lg fg fg-azimuth" severity="secondary" outlined
        aria-label="Bookmark" class="w-100" />
    </RibbonItemGroupComponent>

    <RibbonItemGroupComponent rows="1" cols="1">
      <Button @click="clear" v-tooltip.bottom="'Apagar'" icon="pi pi-eraser" class="w-100" severity="secondary"
        outlined />
    </RibbonItemGroupComponent>

    <RibbonItemGroupComponent rows="1" cols="1">
      <Button @click="showResume" v-tooltip.bottom="'Ver resumo'" icon="pi pi-list" class="w-100" severity="secondary"
        outlined />
    </RibbonItemGroupComponent>

    <!-- <RibbonItemGroupComponent title="Testes" rows="1" cols="4">
            <MultiSelect v-model="selectedCities" :options="cities" optionLabel="name" :maxSelectedLabels="3"
                class="w-full" />
        </RibbonItemGroupComponent> -->
  </RibbonGroupComponent>

</template>

<script>
import Measure from '@/classes/map/Measure.js'

export default {
  name: 'MeasureComponent',
  data() {
    return {
      measure: new Measure(),
      measures: [],
      resume: []
    }
  },
  mounted() { },
  methods: {
    async getCoordinates() {
      this.measures.push(await this.measure.getCoordinates())
      console.log(this.measures)
    },
    async getDistance() {
      this.measures.push(await this.measure.getDistance())
    },
    async getArea() {
      this.measures.push(await this.measure.getArea())
    },
    async getAzimuth() {
      this.measures.push(await this.measure.getAzimuth())
    },
    clear() {
      this.measure.clear()
      this.measures = []
    },
    showResume() {
      this.resume = []
      const data = [];
      for (let i = 0; i < this.measures.length; i++) {
        data.push(this._getDescriptions(this.measures[i]));
      }

      for (let i = 0; i < data.length; i++) {
        const element = data[i];

        //TODO: Implementar a lógica para montar o resumo

        // if (element instanceof Array) {
        //   let item = {}
        //   for (let j = 0; j < element.length; j++) {

        //   }

        //   this.resume.push(item);
        // } else {
        //   this.resume.push(element)
        // }

      }





      console.log(data)

    },
    _getDescriptions(measure) {
      if (measure.type == "FeatureCollection") {
        const descriptions = [];
        for (let i = 0; i < measure.features.length; i++) {
          descriptions.push(this._getDescriptions(measure.features[i]));
        }
        console.log(descriptions);
        return descriptions;
      } else {
        return measure.properties;
      }
    }

  }
}
</script>

<style scoped></style>
