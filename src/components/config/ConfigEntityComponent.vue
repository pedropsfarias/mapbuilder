<template>
  <div class="p-fluid">
    <form @submit.prevent="addEntity">
      <div class="p-field">
        <label for="entity-name">Name</label>
        <InputText id="entity-name" v-model="entity.name" placeholder="Name" required />
      </div>
      <div class="p-field">
        <label for="entity-table-name">Table Name</label>
        <InputText
          id="entity-table-name"
          v-model="entity.table"
          placeholder="Table Name"
          required
        />
      </div>
      <div class="p-field">
        <label for="entity-descritor">Atributo Descritor</label>
        <Dropdown
          id="entity-descritor"
          v-model="entity.descritor"
          :options="descritors"
          optionLabel="label"
          placeholder="Atributo Descritor"
        />
      </div>
      <div class="p-field">
        <label for="entity-geometry-type">Geometry Type</label>
        <Dropdown
          id="entity-geometry-type"
          v-model="entity.geometryType"
          :options="geometryTypes"
          optionLabel="label"
          placeholder="Geometry Type"
        />
      </div>
      <div class="p-field">
        <label for="entity-epsg">Select EPSG</label>
        <Dropdown
          id="entity-epsg"
          v-model="entity.epsg"
          :options="epsgs"
          optionLabel="label"
          placeholder="Select EPSG"
        />
      </div>
      <div class="p-field">
        <Button type="submit" label="Add Entity" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EntityForm',
  components: {},
  data() {
    return {
      entity: {
        name: '',
        table: '',
        descritor: null,
        geometryType: null,
        epsg: null
      },
      descritors: [
        { label: 'Nome', value: 'Nome' },
        { label: 'Código', value: 'Código' },
        { label: 'Incrição #1', value: 'Incrição #1' },
        { label: 'Incrição #2', value: 'Incrição #2' },
        { label: 'Incrição #3', value: 'Incrição #3' },
        { label: 'Incrição #4', value: 'Incrição #4' },
        { label: 'Incrição #5', value: 'Incrição #5' },
        { label: 'Incrição #6', value: 'Incrição #6' }
      ],
      geometryTypes: [
        { label: 'Polygon', value: 'Polygon' },
        { label: 'Line', value: 'Line' },
        { label: 'Point', value: 'Point' }
      ],
      epsgs: [
        { label: 'EPSG: 31971 - SIRGAS 2000 / UTM zone 17N', value: 31971 },
        { label: 'EPSG: 31972 - SIRGAS 2000 / UTM zone 18N', value: 31972 },
        { label: 'EPSG: 31973 - SIRGAS 2000 / UTM zone 19N', value: 31973 },
        { label: 'EPSG: 31974 - SIRGAS 2000 / UTM zone 20N', value: 31974 },
        { label: 'EPSG: 31975 - SIRGAS 2000 / UTM zone 21N', value: 31975 },
        { label: 'EPSG: 31976 - SIRGAS 2000 / UTM zone 22N', value: 31976 },
        { label: 'EPSG: 31977 - SIRGAS 2000 / UTM zone 17S', value: 31977 },
        { label: 'EPSG: 31978 - SIRGAS 2000 / UTM zone 18S', value: 31978 },
        { label: 'EPSG: 31979 - SIRGAS 2000 / UTM zone 19S', value: 31979 },
        { label: 'EPSG: 31980 - SIRGAS 2000 / UTM zone 20S', value: 31980 },
        { label: 'EPSG: 31981 - SIRGAS 2000 / UTM zone 21S', value: 31981 },
        { label: 'EPSG: 31982 - SIRGAS 2000 / UTM zone 22S', value: 31982 }
      ]
    };
  },
  methods: {
    async addEntity() {
      try {
        const response = await fetch('http://localhost:3000/wiselis/entities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ entity: this.entity })
        });
        if (response.ok) {
          this.resetForm();
          // Carregar entidades se necessário
        } else {
          console.error('Error adding entity:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding entity:', error);
      }
    },
    resetForm() {
      this.entity = {
        name: '',
        table: '',
        descritor: null,
        geometryType: null,
        epsg: null
      };
    }
  }
};
</script>

<style scoped>
.p-fluid .p-field {
  margin-bottom: 1em;
}

.p-fluid form {
  padding: 1.5rem;
}
</style>
