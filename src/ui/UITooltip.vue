<script setup lang="ts">
// Demo: This component is a abstraction of the tippy.js library. We are not trying to replicate all the features of the library, just the simple tooltip.

interface Props {
  content: string
}

const props = defineProps<Props>()
</script>

<template>
  <tippy :content="props.content">
    <slot />
  </tippy>
</template>
