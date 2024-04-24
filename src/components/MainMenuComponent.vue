<template>
  <Menubar :model="itens" start="search" />
</template>

<script>
import Menubar from 'primevue/menubar';

export default {
  components: {
    Menubar
  },
  data() {
    return {
      search: null,
      itens: [
        {
          label: 'Home',
          icon: 'pi pi-home'
        },
        {
          label: 'Features',
          icon: 'pi pi-star'
        },
        {
          label: 'Projects',
          icon: 'pi pi-search',
          items: [
            {
              label: 'Components',
              icon: 'pi pi-bolt'
            },
            {
              label: 'Blocks',
              icon: 'pi pi-server'
            },
            {
              label: 'UI Kit',
              icon: 'pi pi-pencil'
            },
            {
              label: 'Templates',
              icon: 'pi pi-palette',
              items: [
                {
                  label: 'Apollo',
                  icon: 'pi pi-palette'
                },
                {
                  label: 'Ultima',
                  icon: 'pi pi-palette'
                }
              ]
            }
          ]
        },
        {
          label: 'Contact',
          icon: 'pi pi-envelope'
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
