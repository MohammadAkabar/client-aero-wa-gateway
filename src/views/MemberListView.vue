<script>
import ContextMenu from 'primevue/contextmenu'
import Tag from 'primevue/tag'
import Toast from 'primevue/toast'

export default {
  data() {
    return {
      selectedUser: null,
      users: [
        { id: 0, name: 'Amy Elsner', image: 'amyelsner.png', role: 'Admin' },
        { id: 1, name: 'Anna Fali', image: 'annafali.png', role: 'Member' },
        { id: 2, name: 'Asiya Javayant', image: 'asiyajavayant.png', role: 'Member' },
        { id: 3, name: 'Bernardo Dominic', image: 'bernardodominic.png', role: 'Guest' },
        { id: 4, name: 'Elwin Sharvill', image: 'elwinsharvill.png', role: 'Member' }
      ],
      components: {
        ContextMenu,
        Tag,
        Toast
      },
      items: [
        {
          label: 'Roles',
          icon: 'pi pi-users',
          items: [
            {
              label: 'Admin',
              command: () => {
                this.selectedUser.role = 'Admin'
              }
            },
            {
              label: 'Member',
              command: () => {
                this.selectedUser.role = 'Member'
              }
            },
            {
              label: 'Guest',
              command: () => {
                this.selectedUser.role = 'Guest'
              }
            }
          ]
        },
        {
          label: 'Invite',
          icon: 'pi pi-user-plus',
          command: () => {
            this.$toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Invitation sent!',
              life: 3000
            })
          }
        }
      ]
    }
  },
  methods: {
    onRightClick(event, user) {
      this.selectedUser = user
      this.$refs.menu.show(event)
    },
    getBadge(user) {
      if (user.role === 'Member') return 'info'
      else if (user.role === 'Guest') return 'warning'
      else return null
    }
  }
}
</script>

<template>
  <div class="card flex md:justify-center mt-6 ms-4">
    <ul
      class="m-0 list-none border border-surface-200 dark:border-surface-700 rounded p-3 flex flex-col gap-2 w-full md:w-[30rem]"
    >
      <li
        v-for="user in users"
        :key="user.id"
        :class="[
          'p-2 hover:bg-primary-50 dark:hover:bg-primary-400/30 rounded border transition-all duration-200 flex items-center justify-between',
          { 'border-transparent': selectedUser?.id !== user.id },
          { 'border-primary-500 dark:border-primary-400': selectedUser?.id === user.id }
        ]"
        @contextmenu="onRightClick($event, user)"
      >
        <div class="flex items-center gap-2">
          <img
            :alt="user.name"
            :src="`https://primefaces.org/cdn/primevue/images/avatar/${user.image}`"
            style="width: 32px"
          />
          <span class="font-bold text-slate-400">{{ user.name }}</span>
        </div>
        <Tag :value="user.role" :severity="getBadge(user)" />
      </li>
    </ul>
    <ContextMenu ref="menu" :model="items" @hide="selectedUser = null" />
    <Toast />
  </div>
</template>
