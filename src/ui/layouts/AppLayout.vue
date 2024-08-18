<script setup lang="ts">
import SidebarNavigationGroup from './AppLayout/SidebarNavigationGroup.vue'
import { ROUTE_NAMES } from '@/router'
import StarIcon from '@/ui/icons/StarIcon.vue'

const MENU_CONFIG: InstanceType<typeof SidebarNavigationGroup>['$props'] = {
  label: 'Administrador',
  children: [
    {
      label: 'Talento',
      icon: StarIcon,
      children: [{ label: 'Reclutamiento', routeName: ROUTE_NAMES.VACANCY_BOARD }]
    }
  ]
}
</script>

<template>
  <div class="app-layout">
    <aside class="app-layout__sidebar w-64 p-2 flex flex-col gap-2 mr-6">
      <slot name="logo">
        <div
          class="border-dotted border-2 border-[#CBD5E1] p-4 text-center text-gray-500 rounded-[4px] text-xs"
        >
          Slot logo
        </div>
      </slot>

      <SidebarNavigationGroup :label="MENU_CONFIG.label" :children="MENU_CONFIG.children" />
    </aside>

    <main>
      <slot />
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
  @apply flex bg-[#F1F5F9] min-h-screen;

  &__sidebar {
    @apply w-64 bg-white;
    box-shadow:
      10px 0px 6px rgba(108, 99, 255, 0.02),
      1px 0px 2px rgba(108, 99, 255, 0.03),
      4px 0px 4px rgba(108, 99, 255, 0.02);

    &-wrapper {
      @apply h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800;
    }

    &-nav {
      @apply space-y-2 font-medium;
    }
  }
}

.only-on-desktop-wall {
  @apply fixed inset-0 bg-white flex items-center justify-center lg:hidden px-10;
}
</style>
