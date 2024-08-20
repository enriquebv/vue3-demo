<script setup lang="ts">
interface Props {
  activeTabId: string
  tabs: { label: string; id: string }[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="flex border-[#F1F5F9] border-b-[1px]">
    <div
      class="relative h-11 flex align-center justify-center px-6"
      v-for="tab in props.tabs"
      :key="tab.id"
    >
      <div class="inline-flex flex-col relative items-center justify-center">
        <button
          :class="{
            'font-bold text-purple-600': tab.id === props.activeTabId,
            'text-[#E2E8F0]': tab.id !== props.activeTabId
          }"
        >
          {{ tab.label }}
        </button>
        <div
          v-if="tab.id === props.activeTabId"
          class="absolute -bottom-[1px] left-0 right-0 h-[2px] rounded-t-[2px] bg-purple-600"
        ></div>
      </div>
    </div>
  </div>
</template>
