<script setup lang="ts">
import { dateToRelative } from '@/utils/date'
import { onBeforeMount, onMounted, ref } from 'vue'

// Note: We use an isolated component to perform renders
// in the lowest possible level

interface Props {
  date: string
}

const props = defineProps<Props>()

const relativeTime = ref(dateToRelative(props.date))

let interval: number | undefined

onMounted(() => {
  interval = setInterval(() => {
    relativeTime.value = dateToRelative(props.date)
  }, 1000)
})

onBeforeMount(() => {
  clearInterval(interval)
})
</script>

<template>
  <span>{{ relativeTime }}</span>
</template>
