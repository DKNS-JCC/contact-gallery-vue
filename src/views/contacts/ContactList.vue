<template>
    <h1>Listar contacts</h1>
    <Button @click="addContact" label="Add Contact"></Button>
    <DataTable :value="contacts">
        <Column field="id" header="ID"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="phone" header="Phone"></Column>
        <Column field="favourite" header="Favourite"></Column>
        <Column field="actions" header="Actions">
            <template #body="slotProps">
                <Button label="Edit" @click="goToEdit(slotProps.data.id)" class="p-button-warning p-mr-2"></Button>
                <Button label="Delete" class="p-button-danger" @click="deleteContact(slotProps.data.id)"></Button>
                <RouterLink :to="`/contacts/${slotProps.data.id}`">
                    <Button label="View" class="p-button-info p-ml-2"></Button>
                </RouterLink>
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
    <div class="card flex justify-center">
        <Button @click="showTemplate()" label="Save"></Button>
    </div>
    <Toast />
</template>

<script setup>
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

const showTemplate = () => {
    confirm.require({
        group: 'templating',
        header: 'Confirmation',
        message: 'Please confirm to proceed moving forward.',
        icon: 'pi pi-exclamation-circle',
        rejectProps: {
            label: 'Cancel',
            icon: 'pi pi-times',
            outlined: true,
            size: 'small'
        },
        acceptProps: {
            label: 'Save',
            icon: 'pi pi-check',
            size: 'small'
        },
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

import { storeToRefs } from 'pinia';
import { useContactStore } from '@/store/contacts';
import { useRouter } from 'vue-router';

const contactStore = useContactStore();
const { contacts } = storeToRefs(contactStore);
const router = useRouter();

function deleteContact(id) {

    if (confirm('Seguro de que quieres borrar?')) {
        contactStore.removeContact(id);
    }
}

function addContact() {
    router.push('/contactos/nuevo');
}

function goToEdit(id) {
    router.push(`/contactos/${id}/editar`);
}
</script>