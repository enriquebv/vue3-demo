<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import UIButton from './UIButton.vue'

const modal = ref<HTMLDialogElement | null>(null)

interface Action {
  label: string
  onAction: () => void
}

interface Props {
  title: string
  open: boolean
  cancelAction?: Action
  confirmAction: Action
}

const props = defineProps<Props>()

interface Emits {
  (event: 'close'): void
}

const emit = defineEmits<Emits>()

// Note: If the modal is opened by default, open the dialog
onMounted(() => {
  if (!modal.value) {
    throw new Error('Modal element is not available')
  }

  if (props.open) {
    modal.value.showModal()
  }
})

// Note: Watch the open prop and open or close the dialog accordingly
watch(
  () => props.open,
  (isOpen) => {
    if (!modal.value) {
      throw new Error('Modal element is not available')
    }

    if (isOpen) {
      modal.value.showModal()
    } else {
      modal.value.close()
    }
  }
)
</script>

<template>
  <!-- The native dialog element -->
  <dialog ref="modal" class="p-6 rounded-lg shadow-lg w-96">
    <header class="flex items-center justify-between mb-4">
      <p class="text-xl font-semibold">{{ props.title }}</p>
      <button @click="emit('close')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </header>

    <div class="mb-4">
      <slot />
    </div>

    <footer class="flex justify-end">
      <UIButton v-if="props.cancelAction" @click="props.cancelAction.onAction">
        {{ props.cancelAction.label }}
      </UIButton>
      <UIButton @click="props.confirmAction.onAction">{{ props.confirmAction.label }}</UIButton>
    </footer>
  </dialog>
</template>

<style scoped>
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
