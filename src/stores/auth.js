import axios from 'axios'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
const URL_API_SERVER = import.meta.env.VITE_API_URL_SERVER
const API_KEY = import.meta.env.VITE_API_KEY_SERVER

export const useAuthStore = defineStore('auth', {
  state: () => ({}),
  actions: {
    async login(form) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${URL_API_SERVER}/auth/login`,
          data: form
        })
        console.log(data)
        localStorage.setItem('access_token', data.data.access_token)
        localStorage.setItem('uid', data.data.id)
        this.router.push('/')
      } catch (error) {
        console.error(error)
      }
    }
  }
})
