<script setup lang="ts">
// Demo: This is the main component of the application, it is responsible for rendering the layout and the router view
// Also, it captures errors in the component tree and shows a dialog with the error message.

import { onBeforeRouteLeave, RouterView, useRouter } from 'vue-router'
import BackofficeLayout from './ui/layouts/backoffice-layout/BackofficeLayout.vue'
import { onErrorCaptured, ref } from 'vue'
import UIDialog from './ui/UIDialog.vue'
import { handleError } from './utils/error'
import useErrorHandler from './composables/error-handler'
import { VacancyNotFoundError } from './infrastructure/api-service/exceptions'

useErrorHandler(onError)

const isErrorDialogVisible = ref(false)
const errorDialogMessage = ref('')
const router = useRouter()

function onErrorDialogClose() {
  isErrorDialogVisible.value = false
  errorDialogMessage.value = ''
}

function showErrorDialog(message: string) {
  isErrorDialogVisible.value = true
  errorDialogMessage.value = message
}

onBeforeRouteLeave(() => {
  onErrorDialogClose()
})

function onBackToHomeClick() {
  onErrorDialogClose()
  router.push('/')
}

function onError(error: unknown) {
  if (error instanceof VacancyNotFoundError) {
    showErrorDialog('La vacante que buscas no existe.')
    return
  }

  showErrorDialog(
    'Ha ocurrido un error inesperado, ponte en contacto con el administrador del sistema.'
  )

  handleError(error)
}

// Demo: Captures errors in the component tree
onErrorCaptured((error) => {
  onError(error)

  return false
})
</script>

<template>
  <BackofficeLayout>
    <RouterView />

    <UIDialog
      title="Oops!"
      :open="isErrorDialogVisible"
      @close="onErrorDialogClose"
      :confirm-action="{ label: 'Cerrar', onAction: onErrorDialogClose }"
    >
      <p>{{ errorDialogMessage }}</p>
      <a href="/" @click.prevent="onBackToHomeClick">Volver al inicio</a>
    </UIDialog>
  </BackofficeLayout>
</template>
