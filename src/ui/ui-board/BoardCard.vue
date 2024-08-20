<script setup lang="ts">
import ClockIcon from '@/ui/icons/ClockIcon.vue'
import DotsVerticalIcon from '@/ui/icons/DotsVerticalIcon.vue'
import ContextualMenu from '@/ui/ContextualMenu.vue'
import RelativeTime from '@/ui/RelativeTime.vue'

type CardActions = InstanceType<typeof ContextualMenu>['$props']['actions']

interface Props {
  id: string
  title: string
  content: string
  date: string
  actions?: CardActions
}

const props = defineProps<Props>()
</script>

<template>
  <article
    class="flex flex-col bg-[#F8FAFC] p-2 border-[1px] border-[#E2E8F0] rounded-xl max-w-72 gap-2 select-none"
  >
    <header class="flex flex-row flex-nowrap font-semibold text-[#1F2D52]">
      <p class="flex-1 text-ellipsis text-nowrap overflow-hidden">
        {{ props.title }}
      </p>
      <ContextualMenu v-if="props.actions" :actions="props.actions">
        <button class="min-w-3 min-h-3 cursor-pointer">
          <DotsVerticalIcon />
        </button>
      </ContextualMenu>
    </header>

    <main>
      <p class="text-xs text-[#64748B]">{{ props.content }}</p>
    </main>

    <footer>
      <span class="flex items-center gap-1 text-xs stroke-[#94A3B8] text-[#94A3B8]">
        <ClockIcon /> <RelativeTime :date="props.date" />
      </span>
    </footer>
  </article>
</template>
