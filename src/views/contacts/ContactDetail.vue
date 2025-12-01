<template>
    <Card>
        <template #title>
            Product Detail
        </template>
        <template #content>
            <p>ID: {{ contact.id }}</p>
            <p>Name: {{ contact.name }}</p>
            <p>Price: {{ contact.price }} $</p>
        </template>
    </Card>
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