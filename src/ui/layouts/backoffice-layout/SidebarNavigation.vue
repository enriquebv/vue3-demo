<script lang="ts" setup>
/**
 * Demo: This is a complex component, that uses recursive behaviour to render
 * multi-level sidebar navigation. It can render a SidebarGroup or a RouterLink
 * depending on the children prop.
 *
 * Currently this component is used in the AppLayout component to render the
 * sidebar navigation.
 *
 * It "supports" infinite levels of children, but it's not recommended to use it like that,
 * UI is only prepared for 2 levels of children.
 */

import { computed, ref, type Component } from 'vue'
import { useRoute } from 'vue-router'

interface LinkProps {
  label: string
  path: string
}

interface Props {
  label: string
  icon?: Component
  /** This prop must be only used by SidebarGroup recursive behaviour */
  isChild?: boolean
  children: (Props | LinkProps)[]
}

const route = useRoute()
const props: Props = defineProps<Props>()

// Demo: By default, show children
const isOpen = ref(true)

/**
 * Handle the toggle event to change the open state
 */
function onToggle(event: ToggleEvent) {
  const target = event.target as HTMLDetailsElement
  isOpen.value = target.open
}

/**
 * Type guard to detect if needs to render a SidebarGroup or a RouterLink
 */
function isSidebarGroup(item: Props | LinkProps): item is Props {
  return (item as Props).children !== undefined
}

// Demo: This computed property is used to detect if any child is active to apply styles
const hasActiveChild = computed<boolean>(() => {
  function hasActiveChildRecursive(children: (Props | LinkProps)[]): boolean {
    return children.some((child) => {
      if (isSidebarGroup(child)) {
        return hasActiveChildRecursive(child.children)
      }

      return route.path === child.path
    })
  }

  return hasActiveChildRecursive(props.children)
})
</script>

<template>
  <details
    :open="isOpen"
    @toggle="onToggle"
    :class="[
      'nav-container text-sm',
      {
        'text-[#6C63FF]': hasActiveChild && isChild,
        'text-[#64748B]': !isChild
      }
    ]"
  >
    <summary
      class="flex justify-between items-center cursor-pointer"
      :class="{
        'py-3': props.isChild,
        'py-2': !props.isChild
      }"
    >
      <div class="flex gap-2 items-center justify-center">
        <slot name="icon" />
        <p
          :class="{
            uppercase: !props.isChild
          }"
        >
          {{ props.label }}
        </p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        :class="['text-gray-400', { 'transform rotate-180 transition-transform': !isOpen }]"
      >
        <path d="m18 15-6-6-6 6"></path>
      </svg>
    </summary>
    <div
      class="rounded-md bg-slate-50"
      :class="{
        'pb-2': props.isChild
      }"
    >
      <template v-for="(item, index) in props.children">
        <!-- Render sidebar group -->
        <div v-if="isSidebarGroup(item)" :key="`${index}-group`" class="px-2">
          <SidebarNavigation
            v-if="isSidebarGroup(item)"
            :key="`${index}-group`"
            :label="item.label"
            :children="item.children"
            is-child
          >
            <template #icon v-if="item.icon">
              <div class="w-4 h-4 grid content-center ml-[6px]">
                <component :is="item.icon" />
              </div>
            </template>
          </SidebarNavigation>
        </div>

        <!-- Render link -->
        <RouterLink
          v-else
          :to="{ path: item.path }"
          :key="`${index}-link`"
          class="pl-4 border-l-2 border-[#6C63FF] py-2 ml-3 block font-semibold"
        >
          {{ item.label }}
        </RouterLink>
      </template>
    </div>
  </details>
</template>
