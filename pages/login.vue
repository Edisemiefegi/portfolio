<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div class="shadow-md rounded-lg p-3 w-96 h-96 space-y-4">
      <p class="font-semibold text-2xl">Admin Login</p>
      <p class="text-gray-700">sign in to access the admin dashboard</p>

      <Input v-model="form.email" label="email" />
      <Input v-model="form.password" label="password" />
      <Button @click="handleLogin" class="w-full">Sign In</Button>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composable/useAuth';

const { login } = useAuth()
const form = ref({
  email: '',
  password: ''
})


const handleLogin = async () => {
  console.log(form.value.email, form.value.password, 'b');
  
 await login(form.value.email, form.value.password)
   console.log(form.value.email, form.value.password, 'a');

}


</script>

<style lang="scss" scoped></style>
