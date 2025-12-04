<template>
  <div class="card flex flex-column align-items-center gap-3 p-4">
    <h2>Añadir Contacto</h2>

    <Form v-slot="$form" :initialValues="initialValues" :resolver="resolver" @submit="onFormSubmit"
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
        <ToggleButton v-model="checked" onLabel="Activo" offLabel="Inactivo" onIcon="pi pi-circle-fill" 
        offIcon="pi pi-circle" class="w-36"/>
      </div>

      <div class="flex gap-2 mt-3">
        <Button type="submit" label="Guardar" icon="pi pi-check" />
        <Button type="button" label="Cancelar" severity="secondary" icon="pi pi-times" @click="router.push('/contactos')" />
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { z } from 'zod'
import { Form } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useContactStore } from '@/store/contacts'
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import Message from 'primevue/message'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const contactStore = useContactStore()
const router = useRouter()
const toast = useToast()

const initialValues = ref({
  name: '',
  phone: '',
  email: '',
  company: '',
  favourite: false
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
  if (valid) {
    const contacts = contactStore.getContacts
    const lastId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) : 0
    
    const newContact = {
      id: lastId + 1,
      name: values.name,
      phone: values.phone,
      email: values.email,
      company: values.company || '',
      favourite: values.favourite || false
    }
    
    contactStore.addContact(newContact)
    
    toast.add({
      severity: 'success',
      summary: 'Contacto añadido',
      detail: `${newContact.name} ha sido añadido correctamente`,
      life: 3000
    })
    
    router.push(`/contactos/${newContact.id}`)
  }
}
</script>