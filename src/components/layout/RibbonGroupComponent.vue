<template>
  <div class="group">
    <div class="group-item-double">Dibujar</div>
    <div>Editar</div>
    <div>Modificar</div>
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
  }
};
</script>

<style scoped>
.group {
  position: relative;
  width: 200px;
  height: 100%;
  border: 1px solid #e8e8e8;
  border-radius: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
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

.group-item-double {
  grid-column: span 2;
}
</style>
