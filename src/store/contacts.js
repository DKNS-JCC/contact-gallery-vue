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
            this.contacts.push(contact);
        },
        removeContact(contactId) {
            this.contacts = this.contacts.filter(p => p.id !== contactId);
        },
        editContact(updatedContact) {
            const index = this.contacts.findIndex(p => p.id === updatedContact.id);
        },
        countContacts() {
            return this.contacts.length;
        }
    },
})
