<script>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'

import { mapActions, mapWritableState } from 'pinia'
import { useWhatsappGatewayApi } from '../../stores/API/whatsappGateway'

export default {
  components: {
    Dialog,
    Button,
    FloatLabel,
    InputText,
    Dropdown
  },
  data() {
    return {
      visible: false,
      sessionId: localStorage.getItem('uid'),
      name: ''
    }
  },

  methods: {
    ...mapActions(useWhatsappGatewayApi, ['createSession']),
    async doSaveSession() {
      this.visible = false
      await this.createSession(this.sessionId, this.name)
    }
  }
}
</script>

<template>
  <Button label="Tambahkan Session" icon="pi pi-plus" @click="visible = true" size="small" />

  <!-- dialog pop up -->
  <Dialog v-model:visible="visible" modal header="Tambah session" :style="{ width: '25rem' }">
    <span class="p-text-secondary block mb-5"> Buat session </span>
    <div class="flex align-items-center gap-3 mb-3">
      <FloatLabel>
        <InputText id="session" v-model="name" aria-required="true" />
        <label for="session">Nama Sesi</label>
      </FloatLabel>
      <Button label="Daftarkan" @click.prevent="doSaveSession" icon="pi pi-plus" size="small" />
    </div>
  </Dialog>
</template>
