import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ContactAdd from '@/views/contacts/ContactAdd.vue'
import ContactEdit from '@/views/contacts/ContactEdit.vue'
import ContactDetail from '@/views/contacts/ContactDetail.vue'
import ContactList from '@/views/contacts/ContactList.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/contactos', name: 'contact', component: ContactList },
  { path: '/contactos/:id', name: 'contact-detail', component: ContactDetail, props: true },
  { path: '/contactos/:id/editar', name: 'contact-edit', component: ContactEdit, props: true },
  { path: '/contactos/nuevo', name: 'contact-add', component: ContactAdd, props: true },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),   
})

export default router