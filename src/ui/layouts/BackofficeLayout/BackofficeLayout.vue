<script setup lang="ts">
import SidebarNavigation from './SidebarNavigation.vue'
import StarIcon from '@/ui/icons/StarIcon.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const MENU_CONFIG: InstanceType<typeof SidebarNavigation>['$props'] = {
  label: 'Administrador',
  children: [
    {
      label: 'Talento',
      icon: StarIcon,
      children: [{ label: 'Reclutamiento', path: `/vacancy/${import.meta.env.VITE_VACANCY_ID}` }]
    }
  ]
}
</script>

<template>
  <div class="app-layout pr-6 flex bg-[#F1F5F9] min-h-screen w-full">
    <aside class="app-layout__sidebar p-2 flex flex-col gap-2 bg-white">
      <slot name="logo">
        <div
          class="border-dotted border-2 border-[#CBD5E1] p-4 text-center text-gray-500 rounded-[4px] text-xs"
        >
          Slot logo
        </div>
      </slot>

      <SidebarNavigation :label="MENU_CONFIG.label" :children="MENU_CONFIG.children" />
    </aside>

    <main class="app-layout__content flex flex-col pb-2">
      <h1 class="text-3xl font-bold pt-3">{{ route.meta.title }}</h1>

      <div class="bg-white w-full mt-6 rounded-3xl p-4 flex-1">
        <slot />
      </div>
    </main>
  </div>

  <!-- Note: Due to demo purposes, responsive sidebar layout is not implemented -->
  <div class="only-on-desktop-wall">
    <h1 class="text-4xl font-bold text-gray-800 text-center">
      Esta aplicación solo está disponible para escritorio.
    </h1>
  </div>
</template>

<style lang="postcss">
.app-layout {
  --sidebar-width: theme('spacing.64');
  --sidebar-gap: theme('spacing.6');

  gap: var(--sidebar-gap);

  &__sidebar {
    min-width: var(--sidebar-width);
    box-shadow:
      10px 0px 6px rgba(108, 99, 255, 0.02),
      1px 0px 2px rgba(108, 99, 255, 0.03),
      4px 0px 4px rgba(108, 99, 255, 0.02);
  }

  &__content {
    width: calc(100% - (var(--sidebar-width) + var(--sidebar-gap)));
  }
}

.only-on-desktop-wall {
  @apply fixed inset-0 bg-white flex items-center justify-center lg:hidden px-10;
}
</style>
