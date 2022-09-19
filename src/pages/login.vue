<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const route = useRoute()
const { logIn } = useAuthStore()

const onClick = async() => {
  await logIn()

  const path = (Array.isArray(route.query.path) ? route.query.path[0]?.toString() : route.query.path?.toString()) ?? '/'
  router.replace({
    path: path
  })
}
</script>

<template>
  <button type="button" @click="onClick">Log in</button>
</template>
