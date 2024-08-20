<script lang="ts" setup>
import { reactive, ref } from 'vue'

import InputText from '@/ui/InputText.vue'
import UIDialog from '@/ui/UIDialog.vue'

import useCandidates from '@/composables/candidates'
import useErrorHandler from '@/composables/error-handler'
import useToast from '@/composables/toast'

interface Props {
  open: boolean
  vacancyId: string
  stageOnCreationId: string
}

const props = defineProps<Props>()

interface Emits {
  (event: 'created'): void
  (event: 'close'): void
}

const emit = defineEmits<Emits>()

const submitting = ref(false)
const form = reactive({
  firstName: '',
  lastName: ''
})
const formRef = ref<HTMLFormElement | null>(null)

const toast = useToast()
const candidates = useCandidates()
const errorHandler = useErrorHandler()

async function onSubmit() {
  if (!formRef.value) {
    throw new Error('Form element is not available')
  }

  if (!formRef.value.reportValidity()) {
    return
  }

  submitting.value = true

  try {
    await candidates.add({
      firstName: form.firstName,
      lastName: form.lastName,
      vacancyId: props.vacancyId,
      stageId: props.stageOnCreationId
    })
    toast.show('success', '¡Candidato añadido!')
    emit('created')
  } catch (error) {
    errorHandler.catchError(error)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <UIDialog
    title="Añadir candidato"
    @close="emit('close')"
    :open="props.open"
    :confirm-action="{
      label: 'Añadir',
      onAction: onSubmit,
      disabled: submitting
    }"
    :cancel-action="{
      label: 'Cancelar',
      onAction: () => emit('close'),
      disabled: submitting
    }"
  >
    <form class="grid gap-4" ref="formRef">
      <InputText
        :value="form.firstName"
        @input="(value) => (form.firstName = value)"
        placeholder="Nombre"
        autofocus
        required
      />
      <InputText
        :value="form.lastName"
        @input="(value) => (form.lastName = value)"
        placeholder="Apellidos"
        required
      />
    </form>
  </UIDialog>
</template>
