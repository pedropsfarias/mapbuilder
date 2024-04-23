<template>
  <div class="grid-container">
    <div class="grid-item" style="grid-column: 1/12">1</div>
    <div class="grid-item" style="grid-column: 1/3; grid-row: 2/13">2</div>
    <div class="grid-item" style="grid-column: 3/10; grid-row: 2/10">3</div>
    <div class="grid-item" style="grid-column: 10/12; grid-row: 2/13">4</div>
    <div class="grid-item" style="grid-column: 3/10; grid-row: 10/13">6</div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      layout: [
        {
          width: 100,
          height: 20
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: repeat(12, 8.333vh);
  background-color: #2196f3;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  /* grid-gap: 10px; */
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  font-size: 30px;
  text-align: center;
}
</style>
