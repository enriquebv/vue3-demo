<script setup lang="ts">
import type { Component } from 'vue'

interface BaseAction {
  label: string | Component
}

interface ActionWithSubactions extends BaseAction {
  subactions: Action[]
}

interface FinalAction extends BaseAction {
  onClick: () => void
}

type Action = ActionWithSubactions | FinalAction

interface Props {
  actions: Action[]
}

const props = defineProps<Props>()

function isActionWithSubactions(action: Action): action is ActionWithSubactions {
  return (action as ActionWithSubactions).subactions !== undefined
}

function onActionClick(action: Action) {
  if (!isActionWithSubactions(action)) {
    action.onClick()
  }
}
</script>

<template>
  <tippy interactive trigger="click">
    <template #content>
      <div
        class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <template v-for="(action, index) in props.actions" :key="index">
            <p
              @click="onActionClick(action)"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <template v-if="isActionWithSubactions(action)">
                <ContextualMenu :actions="action.subactions">
                  <div class="flex justify-between">
                    {{ action.label }}
                    <svg
                      class="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.292 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </ContextualMenu>
              </template>

              <template v-else>
                {{ action.label }}
              </template>
            </p>
          </template>
        </div>
      </div>
    </template>

    <template #default>
      <slot />
    </template>
  </tippy>
</template>
