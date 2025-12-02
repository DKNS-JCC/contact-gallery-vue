<template>
    <h1>Lista de contactos</h1>

    <Toolbar class="mb-4">
        <template #start>
            <Button icon="pi pi-plus" @click="addContact" class="mr-2" severity="secondary" text />
        </template>
        <template #end>
            
            <IconField>
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText placeholder="Buscar contacto" v-model="search" />
            </IconField>
            <div style="margin: 5px;">{{ filteredContacts.length }} Contacto(s)</div>
        </template>
    </Toolbar>
    <DataTable :value="filteredContacts" responsiveLayout="scroll" class="w-full">
        <Column field="id" header="Nº"></Column>
        <Column field="name" header="Nombre"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="phone" header="Teléfono"></Column>
        <Column field="favourite" header="Favorito">
            <template #body="slotProps">
                <i v-if="slotProps.data.favourite" class="pi pi-star text-yellow-500"></i>
                <i v-else class="pi pi-times text-gray-400"></i>
            </template>
        </Column>
        <Column field="actions" header="Acciones">
            <template #body="slotProps">
                <RouterLink :to="`/contactos/${slotProps.data.id}`">
                    <Button label="Ver" class="p-button-info" style="margin: 5px;"></Button>
                </RouterLink>
                <Button label="Editar" @click="goToEdit(slotProps.data.id)" class="p-button-warning"
                    style="margin: 5px;"></Button>
                <Button label="Borrar" class="p-button-danger" style="margin: 5px;"
                    @click="deleteContact(slotProps.data.id)"></Button>
            </template>
        </Column>
    </DataTable>
    <ConfirmDialog group="templating">
        <template #message="slotProps">
            <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700">
                <i :class="slotProps.message.icon" class="!text-6xl text-primary-500"></i>
                <p>{{ slotProps.message.message }}</p>
            </div>
        </template>
    </ConfirmDialog>
    <Toast />
</template>

<script setup>
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Toolbar from 'primevue/toolbar';

const confirm = useConfirm();
const toast = useToast();

import { storeToRefs } from 'pinia';
import { useContactStore } from '@/store/contacts';
import { useRouter } from 'vue-router';

import { ref, computed } from 'vue';

const contactStore = useContactStore();
const { contacts } = storeToRefs(contactStore);
const router = useRouter();

const search = ref('');

const filteredContacts = computed(() => {
    if (!search.value) {
        return contacts.value;
    }
    return contacts.value.filter(contact =>
        contact.name.toLowerCase().includes(search.value.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.value.toLowerCase()) ||
        contact.phone.toLowerCase().includes(search.value.toLowerCase())
    );
});

function deleteContact(id) {
    confirm.require({
        group: 'templating',
        header: 'Borrar contacto',
        message: 'Seguro que quieres borrar este contacto?',
        icon: 'pi pi-trash',
        acceptProps: {
            label: 'Si',
            icon: 'pi pi-check',
            size: 'small'
        },
        rejectProps: {
            label: 'No',
            icon: 'pi pi-times',
            outlined: true,
            size: 'small'
        },
        accept: () => {
            contactStore.removeContact(id)
            toast.add({ severity: 'error', summary: 'Borrado', detail: 'Contacto eliminado correctamente', life: 3000 })
        }
    })
}


function addContact() {
    router.push('/contactos/nuevo');
}

function goToEdit(id) {
    router.push(`/contactos/${id}/editar`);
}

</script>