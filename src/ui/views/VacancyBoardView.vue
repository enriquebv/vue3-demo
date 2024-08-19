<script setup lang="ts">
import useApiService from '@/composables/api-service'
import AppBoard from '../AppBoard/AppBoard.vue'
import useErrorHandler from '@/composables/error-handler'

const errorHandler = useErrorHandler()

const apiService = useApiService()

async function withFutureError() {
  apiService.vacancyCandidates('bf6055bb-50e4-4eaf-83e7-399eb76adf05').then(() => {
    errorHandler.catchError(new Error('This is a future error'))
  })
}

apiService
  .vacancyCandidates('bf6055bb-50e4-4eaf-83e7-399eb76adf05')
  .then(console.log)
  .catch(console.error)
</script>

<template>
  <AppBoard />
  <button @click="withFutureError">Open Modal</button>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
