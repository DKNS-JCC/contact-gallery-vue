<template>
  <div class="card flex flex-column align-items-center gap-5">
    Añadir Producto

    <Form v-slot="$form" :initialValues="initialValues" :resolver="resolver" @submit="onFormSubmit"
      class="flex flex-column gap-4 w-full sm:w-56">
      <div class="flex flex-column gap-1">
        <InputText name="name" type="text" placeholder="Nombre" fluid />
        <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">
          {{ $form.name.error.message }}
        </Message>
      </div>

      <div class="flex flex-column gap-1">
        <InputText name="price" type="number" placeholder="Precio" fluid />
        <Message v-if="$form.price?.invalid" severity="error" size="small" variant="simple">
          {{ $form.price.error.message }}
        </Message>
      </div>

      <Button type="submit" severity="secondary" label="Enviar" />

      <!-- El slot expone el estado completo del formulario -->
      {{ $form }}
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { z } from 'zod'
import { Form } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useContactStore } from '@/store/contacts';
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Button from 'primevue/button'
import { useRouter, useRoute } from 'vue-router';

const contactStore = useContactStore();
const router = useRouter();
const route = useRoute();

// Estado inicial que vive dentro del componente FormparseInt
let contact = undefined
if (route.name === 'contact-edit') {
  contact = contactStore.getContactById((route.params.id))
}

const initialValues = ref({
  name: contact ? contact.name : '',
  price: contact ? contact.price : 0
})


// El resolver traduce el esquema de Zod a las reglas que entiende el Form
const resolver = ref(
  zodResolver(
    z.object({
      name: z.string().min(1, { message: 'Nombre es necesario' }),
      price: z.coerce
        .number({
          required_error: 'Precio es requerido',
          invalid_type_error: 'Precio debe ser un número'
        })
        .min(1, { message: 'Precio debe ser al menos 1' })
        .max(1000, { message: 'Precio debe ser como máximo 1000' })
    })
  )
)

const onFormSubmit = ({ valid, values }) => {
  if (valid) {
    // Obtener el último id y asignar el siguiente
    if (route.name === 'contact-add') {
      const contacts = contactStore.getContacts;
      const lastId = contacts.length > 0 ? Math.max(...contacts.map(p => p.id)) : 0;
      const newContact = {
        id: lastId + 1,
        name: values.name,
        price: values.price
      };
      contactStore.addContact(newContact);
      console.log('Form submitted', newContact);

    } else if (route.name === 'contact-edit') {
      const updatedContact = {
        id: contact.id,
        name: values.name,
        price: values.price
      };
      contactStore.editContact(updatedContact);
    }

    router.push('/contactos');
  }
}
</script>