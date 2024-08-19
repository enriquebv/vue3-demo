<script lang="ts" setup>
import InputText from '../InputText.vue'
import UIDialog from '../UIDialog.vue'
import { reactive, ref } from 'vue'

interface Props {
  open: boolean
  disableSubmit: boolean
}

const props = defineProps<Props>()

interface Emits {
  (event: 'save', payload: { firstName: string; lastName: string }): void
  (event: 'close'): void
}

const emit = defineEmits<Emits>()

const form = reactive({
  firstName: '',
  lastName: ''
})
const formRef = ref<HTMLFormElement | null>(null)

async function onSubmit() {
  if (!formRef.value) {
    throw new Error('Form element is not available')
  }

  if (!formRef.value.reportValidity()) {
    return
  }

  emit('save', form)
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
      disabled: props.disableSubmit
    }"
    :cancel-action="{
      label: 'Cancelar',
      onAction: () => emit('close')
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
