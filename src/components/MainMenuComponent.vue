<template>
  <Toolbar>
    <template #start>
      <ButtonPrime icon="pi pi-plus" class="mr-2" severity="secondary" />
      <ButtonPrime icon="pi pi-print" class="mr-2" severity="secondary" />
      <ButtonPrime icon="pi pi-upload" severity="secondary" />
    </template>

    <template #center>
      <IconField iconPosition="left">
        <InputIcon>
          <i class="pi pi-search" />
        </InputIcon>
        <InputText placeholder="Search" />
      </IconField>
    </template>

    <template #end> <SplitButton label="Save" :model="items"></SplitButton></template>
  </Toolbar>
</template>

<script>
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';

export default {
  components: {
    Toolbar,
    ButtonPrime: Button
  },
  data() {
    return {
      search: null,
      itens: [
        {
          label: 'Update',
          icon: 'pi pi-refresh'
        },
        {
          label: 'Delete',
          icon: 'pi pi-times'
        }
      ]
    };
  }
};
</script>

<style scoped>
.p-menubar {
  padding: 0.2rem;
  border: none;
}
</style>
