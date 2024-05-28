<template>
  <div class="notfound-container">
    <Card>
      <template #title>
        <h1>
          <i
            class="pi pi-exclamation-triangle"
            style="font-size: 2rem; color: #87170e; margin-right: 1rem"
          ></i
          >Oooops!
        </h1>
      </template>
      <template #content>
        <p>
          A página que você está procurando pode ter sido removida, teve seu nome alterado ou está
          temporariamente indisponível.
        </p>
        <br />
      </template>

      <template #footer>
        <Button label="Ir para o início" icon="pi pi-home" outlined @click="goHome"></Button>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goHome() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.notfound-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

h1 {
  font-size: 2em;
  color: #87170e;
}

p {
  margin-top: 0.5em;
  font-size: 1.2em;
  color: #666;
}
</style>
