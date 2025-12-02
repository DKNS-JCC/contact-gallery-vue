<template>
  <Toast />
  <header>
    <nav>
      <router-link to="/">Inicio</router-link>
      <router-link to="/contactos">Contactos</router-link>
      <router-link to="/contactos/nuevo">Añadir Contacto</router-link>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script setup>
  //Sin esto no funciona el Toast
  import Toast from 'primevue/toast'
</script>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
}
.router-link-active {
  font-weight: bold;
}
</style>