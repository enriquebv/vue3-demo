<script setup lang="ts">
import { defineProps, useSlots } from 'vue'

interface Props {
  value: string
  placeholder: string
}

const props = defineProps<Props>()

const slots = useSlots()

const hasPreIconSlot = slots['pre-icon'] !== undefined
</script>

<template>
  <div
    class="flex items-center justify-center text-sm bg-[#F8FAFC] min-w-60 ring-1 ring-[#E2E8F0] rounded-xl overflow-hidden px-3"
  >
    <slot name="pre-icon" />
    <input
      :value="props.value"
      :placeholder="props.placeholder"
      class="placeholder-[#94A3B8] py-2 w-full bg-transparent focus:outline-none"
      :class="{
        'pl-2': hasPreIconSlot
      }"
    />
  </div>
</template>
