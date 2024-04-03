<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return {
      accessToken: ''
    }
  },
  mounted() {
    this.accessToken = localStorage.getItem('access_token')
  },
  watch: {
    // Memantau perubahan pada localStorage
    $route: function () {
      this.accessToken = localStorage.getItem('access_token')
    }
  },
  methods: {
    async doLogout() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('uid')
      localStorage.removeItem('role')
      this.accessToken = ''
      this.$router.push('/login')
    }
  }
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="flex gap-3 text-slate-50">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink v-if="!accessToken" to="/login">Login</RouterLink>

        <!-- Tampilkan tombol Logout jika token akses tersedia, dan tambahkan event handler untuk melakukan logout -->
        <RouterLink v-if="accessToken" @click="doLogout" to="/login">Logout</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/auth-otp">Otp</RouterLink>
        <RouterLink to="/member-list">Member</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
