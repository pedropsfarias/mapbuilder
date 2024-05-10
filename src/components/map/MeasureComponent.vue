<template>
  <RibbonGroupComponent title="Medidas" width="220px">
    <RibbonItemGroupComponent rows="1" cols="2">
      <Button
        @click="getCoordinates"
        label="Pontos"
        icon="fg-multipoint"
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
        icon="fg-polyline-pt"
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
        icon="fg-polygon-pt"
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
        icon="fg-azimuth"
        severity="secondary"
        outlined
        aria-label="Bookmark"
        class="w-100"
      />
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
      measure: new Measure()
    }
  },
  mounted() {},
  methods: {
    getCoordinates() {
      console.log(this.measure.getCoordinates())
    },
    getDistance() {
      console.log(this.measure.getDistance())
    },
    getArea() {
      console.log(this.measure.getArea())
    },
    getAzimuth() {
      console.log(this.measure.getAzimuth())
    }
  }
}
</script>

<style scoped></style>
