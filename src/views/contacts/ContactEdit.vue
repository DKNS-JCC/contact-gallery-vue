<template>
  <div class="card flex flex-column align-items-center gap-3 p-4">
    <h2>Editar Contacto</h2>

    <Form v-if="isLoaded" :key="contactId" v-slot="$form" :initialValues="initialValues" :resolver="resolver" @submit="onFormSubmit"
      class="flex flex-column gap-3 w-full" style="max-width: 500px;">
      
      <div class="flex flex-column gap-2">
        <label for="name">Nombre *</label>
        <InputText name="name" type="text" placeholder="Nombre completo" fluid />
        <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">
          {{ $form.name.error.message }}
        </Message>
      </div>

      <div class="flex flex-column gap-2">
        <label for="phone">Teléfono *</label>
        <InputText name="phone" type="text" placeholder="Número de teléfono" fluid />
        <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">
          {{ $form.phone.error.message }}
        </Message>
      </div>

      <div class="flex flex-column gap-2">
        <label for="email">Email *</label>
        <InputText name="email" type="email" placeholder="correo@ejemplo.com" fluid />
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
          {{ $form.email.error.message }}
        </Message>
      </div>

      <div class="flex flex-column gap-2">
        <label for="company">Empresa</label>
        <InputText name="company" type="text" placeholder="Nombre de la empresa" fluid />
        <Message v-if="$form.company?.invalid" severity="error" size="small" variant="simple">
          {{ $form.company.error.message }}
        </Message>
      </div>

      <div class="flex align-items-center gap-2">
        <Checkbox name="favourite" :binary="true" inputId="favourite" />
        <label for="favourite">Favorito</label>
      </div>

      <div class="flex gap-2 mt-3">
        <Button type="submit" label="Actualizar" icon="pi pi-check" />
        <Button type="button" label="Cancelar" severity="secondary" icon="pi pi-times" @click="router.push('/contactos')" />
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { z } from 'zod'
import { Form } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useContactStore } from '@/store/contacts'
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import Message from 'primevue/message'
import Button from 'primevue/button'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const contactStore = useContactStore()
const router = useRouter()
const route = useRoute()
const toast = useToast()

const contact = ref(null)
const contactId = ref(null)
const isLoaded = ref(false)
const initialValues = ref({
  name: '',
  phone: '',
  email: '',
  company: '',
  favourite: false
})

onMounted(() => {
  const foundContact = contactStore.getContactById(route.params.id)
  
  if (!foundContact) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Contacto no encontrado',
      life: 3000
    })
    router.push('/contactos')
    return
  }
  
  contact.value = foundContact
  contactId.value = foundContact.id
  initialValues.value = {
    name: foundContact.name || '',
    phone: foundContact.phone || '',
    email: foundContact.email || '',
    company: foundContact.company || '',
    favourite: foundContact.favourite || false
  }
  isLoaded.value = true
})

const resolver = ref(
  zodResolver(
    z.object({
      name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
      phone: z.string().min(9, { message: 'El teléfono debe tener al menos 9 dígitos' }),
      email: z.string().email({ message: 'Email inválido' }),
      company: z.string().optional(),
      favourite: z.boolean().optional()
    })
  )
)

const onFormSubmit = ({ valid, values }) => {
  if (valid && contact.value) {
    const updatedContact = {
      id: contact.value.id,
      name: values.name,
      phone: values.phone,
      email: values.email,
      company: values.company || '',
      favourite: values.favourite || false
    }
    
    contactStore.editContact(updatedContact)
    
    toast.add({
      severity: 'info',
      summary: 'Contacto actualizado',
      detail: `${updatedContact.name} ha sido actualizado correctamente`,
      life: 3000
    })
    
    router.push('/contactos')
  }
}
</script>