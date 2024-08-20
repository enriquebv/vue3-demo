<script setup lang="ts">
import BoardColumn from './BoardColumn.vue'
import type { Component } from 'vue'

interface Props {
  columns: {
    id: string
    title: string
    color: InstanceType<typeof BoardColumn>['$props']['color']
    titleIcon: Component
    cards: InstanceType<typeof BoardColumn>['$props']['cards']
  }[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="flex flex-nowrap overflow-x-auto gap-3">
    <BoardColumn
      v-for="column in props.columns"
      :title="column.title"
      :color="column.color"
      :key="column.id"
      :cards="column.cards"
    >
      <template #title-icon>
        <component :is="column.titleIcon" />
      </template>
    </BoardColumn>
  </div>
</template>
