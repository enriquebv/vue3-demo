<script setup lang="ts">
// Note: This is the main component of the application, it is responsible for rendering the layout and the router view
// Also, it captures errors in the component tree and shows a dialog with the error message.

import { RouterView } from 'vue-router'
import BackofficeLayout from './ui/layouts/BackofficeLayout/BackofficeLayout.vue'
import { onErrorCaptured, ref } from 'vue'
import UIDialog from './ui/UIDialog.vue'
import { handleError } from './utils/error'
import useErrorHandler from './composables/error-handler'

useErrorHandler(onError)

const isErrorDialogVisible = ref(false)
const errorDialogMessage = ref('')

function onErrorDialogClose() {
  isErrorDialogVisible.value = false
  errorDialogMessage.value = ''
}

function showErrorDialog(message: string) {
  isErrorDialogVisible.value = true
  errorDialogMessage.value = message
}

function onError(error: unknown) {
  showErrorDialog(
    'Ha ocurrido un error inesperado, ponte en contacto con el administrador del sistema.'
  )

  handleError(error)
}

// Note: Captures errors in the component tree
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
    </UIDialog>
  </BackofficeLayout>
</template>
