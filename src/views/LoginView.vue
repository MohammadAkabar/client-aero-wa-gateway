<script>
import Card from 'primevue/card'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import { mapActions, mapWritableState } from 'pinia'
import { useAuthStore } from '../stores/auth'

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  components: {
    Card,
    FloatLabel,
    InputText,
    Button
  },
  methods: {
    ...mapActions(useAuthStore, ['login']),

    async doLogin() {
      await this.login(this.form)
    }
  }
}
</script>

<template>
  <div class="card mt-7">
    <Card style="width: 25em" class="m-auto">
      <template #title> Login </template>
      <template #content>
        <FloatLabel class="mb-8 mt-5">
          <InputText class="w-full" id="Email" v-model="form.email" />
          <label for="Email">Email</label>
        </FloatLabel>
        <FloatLabel>
          <InputText class="w-full" id="Password" v-model="form.password" />
          <label for="Password">Password</label>
        </FloatLabel>
        <Button label="Login" severity="success" @click="doLogin" class="w-full mt-9 mb-5" />

        <div class="text-center m-auto text-green-400">
          <a href="#">Daftarkan akun</a>
        </div>
      </template>
    </Card>
  </div>
</template>
