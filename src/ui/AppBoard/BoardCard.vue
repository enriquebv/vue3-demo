<script setup lang="ts">
import ClockIcon from '../icons/ClockIcon.vue'
import DotsVerticalIcon from '../icons/DotsVerticalIcon.vue'

import ContextualMenu from '../ContextualMenu.vue'
</script>

<template>
  <article
    class="flex flex-col bg-[#F8FAFC] p-2 border-[1px] border-[#E2E8F0] rounded-xl max-w-72 gap-2"
  >
    <header class="flex flex-row flex-nowrap font-semibold text-[#1F2D52]">
      <p class="flex-1 text-ellipsis text-nowrap overflow-hidden">
        Juan Andrés Ortega Montiel TestTestTestTestTestTest
      </p>
      <ContextualMenu
        :actions="[
          {
            label: 'Cambiar estado a',
            subactions: [
              { label: 'New', onClick: () => console.log('mover a ', 'new') },
              { label: 'Interview', onClick: () => console.log('mover a ', 'interview') },
              { label: 'Hired', onClick: () => console.log('mover a ', 'hired') },
              { label: 'Not selected', onClick: () => console.log('mover a ', 'not selected') }
            ]
          }
        ]"
      >
        <!-- <UITooltip content="Opciones"> -->
        <button class="min-w-3 min-h-3 cursor-pointer">
          <DotsVerticalIcon />
        </button>
        <!-- </UITooltip> -->
      </ContextualMenu>
    </header>

    <main>
      <p class="text-xs text-[#64748B]">Añadido por ATS</p>
    </main>

    <footer>
      <span class="flex items-center gap-1 text-xs stroke-[#94A3B8] text-[#94A3B8]">
        <ClockIcon /> Hoy
      </span>
    </footer>
  </article>
</template>
