<script setup lang="ts">
import BoardCard from './BoardCard.vue'
import { computed } from 'vue'

const COLOR_MAP = {
  green: '#22C55E',
  turquoise: '#14B8A6',
  blue: '#3B82F6',
  red: '#ED6F6F'
} as const

type Color = keyof typeof COLOR_MAP

interface Props {
  title: string
  color?: Color
  cards: InstanceType<typeof BoardCard>['$props'][]
}

const props = defineProps<Props>()

const selectedColor = computed(() => COLOR_MAP[props.color ?? 'blue'])
</script>

<template>
  <article
    :style="{
      '--board-column-color': selectedColor
    }"
    class="board-column h-full border-solid border-[1px] border-slate-200 min-w-72 p-4 rounded-xl"
  >
    <div class="board-column__top-line h-1 w-full rounded-sm mb-2"></div>

    <header class="flex gap-1 mb-3">
      <slot name="title-icon" />
      <p class="font-bold text-accent">{{ props.title }}</p>
    </header>

    <div class="flex flex-col gap-2 max-w-full overflow-y-auto">
      <BoardCard
        v-for="card in props.cards"
        :key="card.id"
        :id="card.id"
        :title="card.title"
        :content="card.content"
        :date="card.date"
        :actions="card.actions"
      />
    </div>
  </article>
</template>

<style lang="postcss">
.board-column {
  &__top-line {
    background-color: var(--board-column-color);
  }

  & > header svg path {
    stroke: var(--board-column-color);
  }
}
</style>
