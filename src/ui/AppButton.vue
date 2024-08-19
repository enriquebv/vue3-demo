<script setup lang="ts">
interface Emits {
  (event: 'click'): void
}

const emits = defineEmits<Emits>()
</script>

<template>
  <button>app button</button>
</template>
