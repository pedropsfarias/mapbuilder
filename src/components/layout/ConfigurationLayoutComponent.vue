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
        <template #title>{{ title }}</template>
        <template #content>
          <component :is="component" />
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import UserMenuComponent from './UserMenuComponent.vue';
import { defineAsyncComponent, markRaw } from 'vue';

const components = {
  entity: markRaw(defineAsyncComponent(() => import('./../config/ConfigEntityComponent.vue')))
};

export default {
  name: 'MainLayoutComponent',
  components: {
    UserMenuComponent
  },
  props: {},
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
  mounted() {
    this.loadComponent();
  },
  methods: {
    loadComponent() {
      const { group, name } = this.$route.params;

      const componentName = `${group}-${name}`.toLocaleLowerCase();

      switch (componentName) {
        case 'models-entity':
          this.component = components.entity;
          this.title = 'Entidade';
          break;
        case 'models-attributes':
          this.component = components.atributos;
          break;
        case 'models-tipos':
          this.component = components.tipos;
          break;
        case 'models-telas':
          this.component = components.telas;
          break;
        case 'geral-relatórios':
          this.component = components.relatorios;
          break;
        case 'geral-funcionalidades':
          this.component = components.funcionalidades;
          break;
        case 'geral-sistema':
          this.component = components.sistema;
          break;
        case 'mapa-mapas':
          this.component = components.mapas;
          break;
        case 'mapa-grupos':
          this.component = components.grupos;
          break;
        case 'mapa-camadas':
          this.component = components.camadas;
          break;
        case 'segurança-usuários':
          this.component = components.usuarios;
          break;
        case 'segurança-perfis':
          this.component = components.perfis;
          break;
        case 'segurança-permissõessistema':
          this.component = components.permissoesSistema;
          break;
        case 'segurança-permissõesmapa':
          this.component = components.permissoesMapa;
          break;
        case 'segurança-preferências':
          this.component = components.preferencias;
          break;
        default:
          this.$router.push({ name: 'NotFound' });
          break;
      }
    }
  }
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
