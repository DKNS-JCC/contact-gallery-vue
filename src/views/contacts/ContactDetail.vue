<template>
    <h1>Detalle del contacto</h1>
    <Card>
        <template #title>
            {{ contact?.name }}
        </template>
        <template #content>
            <p><strong>Teléfono:</strong> {{ contact?.phone }}</p>
            <p><strong>Email:</strong> {{ contact?.email }}</p>
            <p><strong>Empresa:</strong> {{ contact?.company }}</p>
            <p><strong>Favorito:</strong> {{ contact?.favourite ? 'Sí' : 'No' }}</p>

        </template>
        
    </Card>
    <Button label="Volver a la agenda" icon="pi pi-arrow-left" @click="$router.push('/contactos')" />
</template>
<script setup>
import {computed} from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useContactStore } from '@/store/contacts';

const contactID = computed(() => {
    const route = useRoute();
    return route.params.id;
});

const contactStore = useContactStore();
const { contacts } = storeToRefs(contactStore);
const contact = computed(() => {
    return contacts.value.find(p => p.id === parseInt(contactID.value));
});
</script>