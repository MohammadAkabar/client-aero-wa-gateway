import axios from 'axios'
import { defineStore } from 'pinia'

const URL_API_SERVER = import.meta.env.VITE_API_URL_SERVER
const API_KEY = import.meta.env.VITE_API_KEY_SERVER

export const useWhatsappGatewayApi = defineStore('whatsappGateway', {
  state: () => ({
    dataApiResponse: [],
    dataQrResponse: {},
    dataConnectedSession: [],
    dataSessionRegistered: [],
    listSessionByUser: [],
    successSendMessage: {},
    successDelSession: []
  }),
  actions: {
    async createSession(userId, name) {
      try {
        const { data } = await axios({
          method: 'POST',
          headers: { Authorization: `Bearer ${API_KEY}` },
          url: `${URL_API_SERVER}/sessions/create/${userId}`,
          data: { name }
        })
        this.dataSessionRegistered = data.data
      } catch (error) {
        console.error(error)
      }
    },

    async getListSessionByUser(userId) {
      try {
        const { data } = await axios({
          method: 'GET',
          headers: { Authorization: `Bearer ${API_KEY}` },
          url: `${URL_API_SERVER}/sessions/list/${userId}`
        })
        this.listSessionByUser = data
      } catch (error) {
        console.error(error)
      }
    },

    async connectSession(sessionId) {
      try {
        const { data } = await axios({
          method: 'POST',
          headers: { Authorization: `Bearer ${API_KEY}` },
          url: `${URL_API_SERVER}/sessions/add`,
          data: { sessionId }
        })
        this.dataQrResponse = data.data.qr
      } catch (error) {
        console.error(error)
      }
    },
    async getAllConnectedSessions() {
      try {
        const { data } = await axios({
          method: 'GET',
          headers: { Authorization: `Bearer ${API_KEY}` },
          url: `${URL_API_SERVER}/sessions/list`
        })
        this.dataConnectedSession = data
        // this.router.push('/')
      } catch (error) {
        console.error(error)
      }
    },

    async sendMessage(sessionId, receiver, message) {
      try {
        const form = { receiver, message }
        const { data } = await axios({
          method: 'POST',
          headers: { Authorization: `Bearer ${API_KEY}` },
          url: `${URL_API_SERVER}/chats/send?id=${sessionId}`,
          data: form
        })
        this.successSendMessage = data.data
      } catch (error) {
        console.log(error)
      }
    },

    async disconnetedSession(sessionId) {
      try {
        const { data } = await axios({
          method: 'DELETE',
          headers: { Authorization: `Bearer ${API_KEY}` },
          url: `${URL_API_SERVER}/sessions/delete/${sessionId}`
        })
        this.successDelSession = data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
