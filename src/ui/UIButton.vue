<script setup lang="ts">
interface Props {
  disabled?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <button
    class="text-white py-2 px-3 bg-accent rounded-xl text-sm disabled:bg-[#1f2d52a9]"
    :disabled="props.disabled"
  >
    <slot />
  </button>
</template>
