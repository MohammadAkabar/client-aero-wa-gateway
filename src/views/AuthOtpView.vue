<script>
import InputOtp from 'primevue/inputotp'
import Button from 'primevue/button'
export default {
  data() {
    return {
      form: {
        otp: ''
      },
      count: '',
      value: null
    }
  },
  components: {
    InputOtp,
    Button
  },
  method: {}
}
</script>
<template>
  <div class="flex justify-center items-center h-screen">
    <div class="flex flex-col items-center">
      <div class="font-bold text-slate-500 text-9xl mb-8">50</div>
      <div class="font-bold text-xl mb-2 text-slate-50">Authenticate Your Account</div>
      <p class="text-surface-700 dark:text-surface-0/70 block mb-5">
        Please enter the code sent to your phone.
      </p>
      <InputOtp v-model="value" :length="6" style="gap: 0" class="text-slate-200">
        <template #default="{ attrs, events, index }">
          <input type="text" v-bind="attrs" v-on="events" class="custom-otp-input text-slate-100" />
          <div v-if="index === 3" class="px-3">
            <i class="pi pi-minus text-slate-500" />
          </div>
        </template>
      </InputOtp>
      <div class="flex justify-between mt-5 self-stretch">
        <Button label="Resend Code" link class="p-0" @click="doResendCode"></Button>
        <Button label="Submit Code" @click="doSubmitCode"></Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-otp-input {
  width: 48px;
  height: 48px;
  font-size: 24px;
  appearance: none;
  text-align: center;
  transition: all 0.2s;
  border-radius: 0;
  border: 1px solid rgb(var(--surface-400));
  background: transparent;
  outline-offset: -2px;
  outline-color: transparent;
  border-right: 0 none;
  /* transition: outline-color 0.3s; */
  color: var(--text-color);
}

.custom-otp-input:focus {
  outline: 2px solid rgb(var(--primary-500));
}

.custom-otp-input:first-child,
.custom-otp-input:nth-child(5) {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

.custom-otp-input:nth-child(3),
.custom-otp-input:last-child {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  border-right-width: 1px;
  border-right-style: solid;
  border-color: rgb(var(--surface-400));
}
</style>
