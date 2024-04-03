<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dropdown from 'primevue/dropdown'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Image from 'primevue/image'
import InputMask from 'primevue/inputmask'
import Textarea from 'primevue/textarea'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'

import { mapActions, mapWritableState } from 'pinia'
import { useWhatsappGatewayApi } from '../stores/API/whatsappGateway'

import Form from '../components/layouts/Form.vue'

export default {
  components: {
    Form,
    Dropdown,
    DataTable,
    Column,
    Tag,
    Button,
    Dialog,
    Image,
    InputMask,
    Textarea,
    InputText,
    FloatLabel
  },
  data() {
    return {
      visible: false,
      visible2: false,
      visible3: false,
      uid: localStorage.getItem('uid'),
      sessionId: '',
      status: '',
      form: {
        receiver: '',
        message: { text: '' }
      }
    }
  },
  methods: {
    ...mapActions(useWhatsappGatewayApi, [
      'getListSessionByUser',
      'sendMessage',
      'connectSession',
      'getAllConnectedSessions'
    ]),
    async doSendMsg() {
      await this.sendMessage(this.sessionId, this.form.receiver, this.form.message)
    },

    async doPopUp(sessionName) {
      this.visible2 = true
      this.sessionId = sessionName
    },
    async getQr(sessionToken) {
      this.visible3 = true
      await this.connectSession(sessionToken)
    }
  },
  computed: {
    ...mapWritableState(useWhatsappGatewayApi, [
      'listSessionByUser',
      'dataQrResponse',
      'dataConnectedSession'
    ])
  },
  created() {
    this.getListSessionByUser(this.uid)
    this.getAllConnectedSessions()
  }
}
</script>

<template>
  <div class="card m-7">
    <div class="mb-5">
      <Form />
    </div>
    <div class="min-w-[50rem] text-slate-300">
      <table class="w-full border-collapse">
        <caption></caption>
        <thead>
          <tr class="">
            <th class="py-2 px-4 border border-gray-300">name</th>
            <th class="py-2 px-4 border border-gray-300">token</th>
            <th class="py-2 px-4 border border-gray-300">status</th>
            <th class="py-2 px-4 border border-gray-300">action</th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through dataListResponse.data to render rows -->
          <tr v-for="(item, index) in listSessionByUser.data" :key="index">
            <td class="py-2 px-4 border border-gray-300">{{ item.name }}</td>
            <td class="py-2 px-4 border border-gray-300">{{ item.token }}</td>
            <td
              v-if="
                dataConnectedSession.data.length > 0 &&
                dataConnectedSession.data[index] &&
                dataConnectedSession.data[index].sessionName === item.name
                  ? (status = 'active')
                  : (status = 'disconnected')
              "
              class="py-2 px-4 border border-gray-300"
            >
              {{ status }}
            </td>

            <td class="flex-row py-2 px-4 border border-gray-300 mt-3">
              <button
                @click="doPopUp(item.token)"
                class="px-2 py-1 border rounded text-blue-500 border-blue-500 hover:bg-slate-900 focus:outline-none mr-2"
              >
                Kirim Pesan
              </button>
              <button
                @click="getQr(item.id)"
                class="px-2 py-1 border rounded text-green-500 border-green-700 hover:bg-slate-900 focus:outline-none mr-2 mt-2 mb-2"
              >
                Generate Qr
              </button>
              <button
                class="px-2 py-1 border rounded text-red-500 border-red-500 hover:bg-slate-900 focus:outline-none"
              >
                Keluar dari sesi
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- pop up dialog -->
  <Dialog
    v-model:visible="visible2"
    modal
    header="Coba kirim Pesan"
    :style="{ width: '25rem' }"
    id="pop-up"
  >
    <span class="p-text-secondary block mb-5">Test Kirim Pesan</span>
    <div class="flex align-items-center gap-3 mb-7 mt-4">
      <input type="text" v-model="sessionId" hidden />
      <FloatLabel>
        <InputText id="sessionName" v-model="form.receiver" size="small" />
        <label for="sessionName" class="text-sm">Nomor dituju</label>
      </FloatLabel>
    </div>
    <div class="flex align-items-center gap-3 mb-3">
      <FloatLabel>
        <Textarea v-model="form.message.text" id="text-field" autoResize rows="5" cols="30" />
        <Label for="text-field" class="text-sm">Masukkan Pesan</Label>
      </FloatLabel>
    </div>
    <div class="flex justify-content-end gap-2">
      <Button type="button" label="Batal  " severity="secondary" @click="visible2 = false"></Button>
      <Button type="button" label="Kirim" @click="doSendMsg"></Button>
    </div>
  </Dialog>

  <!-- pop up dialog -->
  <Dialog
    v-model:visible="visible3"
    modal
    header="Generate Qr Code"
    :style="{ width: '35rem' }"
    id="pop-up"
  >
    <div style="display: flex; flex-direction: column; align-items: center">
      <div>
        <img :src="dataQrResponse" alt="qr" />
      </div>
      <div class="flex justify-content-end gap-2 mt-5">
        <Button type="button" label="Selesai" @click="visible3 = false"></Button>
      </div>
    </div>
  </Dialog>
</template>
