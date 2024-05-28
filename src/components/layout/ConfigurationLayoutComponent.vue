<template>
  <div ref="container" class="container">
    <div ref="header" class="header">
      <Toolbar>
        <template #end>
          <UserMenuComponent />
        </template>
      </Toolbar>
    </div>
    <div class="menu">
      <PanelMenu :model="menuItems" class="w-100" />
    </div>
    <div class="content">
      <Card>
        <template #title>
          <slot name="title" />
        </template>
        <template #content>
          <slot name="content" />
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import UserMenuComponent from './UserMenuComponent.vue';

export default {
  name: 'ConfigurationLayoutComponent',
  components: {
    UserMenuComponent
  },
  data() {
    return {
      menuItems: [
        {
          label: 'Modelos',
          icon: 'pi pi-objects-column',
          items: [
            {
              label: 'Classes',
              icon: 'pi pi-fw pi-file',
              command: () => this.toggleConfigMenu('Classes')
            },
            {
              label: 'Atributos',
              icon: 'pi pi-fw pi-file',
              command: () => this.toggleConfigMenu('Atributos')
            },
            {
              label: 'Tipos',
              icon: 'pi pi-fw pi-file',
              command: () => this.toggleConfigMenu('Tipos')
            },
            {
              label: 'Telas',
              icon: 'pi pi-fw pi-file',
              command: () => this.toggleConfigMenu('Telas')
            }
          ]
        },
        {
          label: 'Geral',
          icon: 'pi pi-cog',
          items: [
            {
              label: 'Relatórios',
              icon: 'pi pi-fw pi-file',
              command: () => this.toggleConfigMenu('Relatórios')
            },
            {
              label: 'Funcionalidades',
              icon: 'pi pi-fw pi-file',
              command: () => this.toggleConfigMenu('Funcionalidades')
            },
            {
              label: 'Sistema',
              icon: 'pi pi-fw pi-file',
              command: () => this.toggleConfigMenu('Sistema')
            }
          ]
        },
        {
          label: 'Mapa',
          icon: 'pi pi-map',
          items: [
            {
              label: 'Mapas',
              icon: 'pi pi-fw pi-file',
              command: () => this.toggleConfigMenu('Mapas')
            },
            {
              label: 'Grupos',
              icon: 'pi pi-fw pi-file',
              command: () => this.toggleConfigMenu('Grupos')
            },
            {
              label: 'Camadas',
              icon: 'pi pi-fw pi-file',
              command: () => this.toggleConfigMenu('Camadas')
            }
          ]
        },
        {
          label: 'Segurança',
          icon: 'pi pi-lock',
          items: [
            {
              label: 'Usuários',
              icon: 'pi pi-fw pi-file',
              command: () => this.toggleConfigMenu('Usuários')
            },
            {
              label: 'Perfis',
              icon: 'pi pi-fw pi-file',
              command: () => this.toggleConfigMenu('Perfis')
            },
            {
              label: 'Permissões Sistema',
              icon: 'pi pi-fw pi-file',
              command: () => this.toggleConfigMenu('Permissões Sistema')
            },
            {
              label: 'Permissões Mapa',
              icon: 'pi pi-fw pi-file',
              command: () => this.toggleConfigMenu('Permissões Mapa')
            },
            {
              label: 'Preferências',
              icon: 'pi pi-fw pi-file',
              command: () => this.toggleConfigMenu('Preferências')
            }
          ]
        }
      ],
      component: null,
      title: ''
    };
  },
  mounted() { },
  methods: {}
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.menu {
  display: flex;
  flex-direction: row;
  width: 250px;
  height: calc(100% - 52px);
  position: relative;
  float: left;
  padding: 1rem;
  background: #fff;
}

.content {
  width: calc(100% - 250px);
  height: calc(100% - 52px);
  position: relative;
  float: left;
  padding: 1.5rem;
}
</style>
