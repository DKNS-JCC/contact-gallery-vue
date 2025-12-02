<template>
  <div class="flex flex-column align-items-center gap-4 p-4">
    <Card class="w-full" style="max-width: 600px;">
      <template #header>
        <div class="flex justify-content-center p-3">
          <i class="pi pi-address-book" style="font-size: 4rem; color: var(--primary-color);"></i>
        </div>
      </template>
      <template #title>
        <h1 class="text-center m-0">Agenda de Contactos</h1>
      </template>
        <template #content>
            <div class="p-4">
            <Button label="Ver Contactos" icon="pi pi-users" @click="router.push('/contactos')" />
            </div>
        </template>
    </Card>
  </div>
</template>

<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>