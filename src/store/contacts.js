import { defineStore } from 'pinia'

export const useContactStore = defineStore('contactStore', {
    state: () => ({
        contacts: [],
    }),
    getters: {
        getContacts: (state) => state.contacts,
        getContactById: (state) => (id) => state.contacts.find(p => p.id === parseInt(id)),
    },
    actions: {
        addContact(contact) {
            this.contacts.push(contact)
        },
        removeContact(contactId) {
            this.contacts = this.contacts.filter(c => c.id !== contactId)
        },
        editContact(updatedContact) {
            const index = this.contacts.findIndex(c => c.id === updatedContact.id)
            if (index !== -1) {
                this.contacts[index] = updatedContact
            }
        },
    },
})
