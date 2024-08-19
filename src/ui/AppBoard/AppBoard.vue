<script setup lang="ts">
import AppTabs from '../AppTabs.vue'
import UIButton from '../UIButton.vue'
import InputText from '../InputText.vue'

import EnvelopeIcon from '../icons/EnvelopeIcon.vue'
import InboxIcon from '../icons/InboxIcon.vue'
import UserIcon from '../icons/UserIcon.vue'
import ConfettiIcon from '../icons/ConfettiIcon.vue'
import StopIcon from '../icons/StopIcon.vue'

import BoardColumn from '../AppBoard/BoardColumn.vue'
import { ref } from 'vue'

const activeTabId = ref('vacancies')
const searchTerm = ref('')

const TABS = [
  { id: 'vacancies', label: 'Vacantes' },
  { id: 'candidates', label: 'Candidatos' }
]

const onTabChange = (tabId: string) => {
  activeTabId.value = tabId
}
</script>

<template>
  <div class="flex flex-col h-full">
    <AppTabs :tabs="TABS" :active-tab-id="activeTabId" @change="onTabChange" />
    <div class="py-4 flex justify-between">
      <InputText :value="searchTerm" placeholder="Buscar">
        <template #pre-icon>
          <EnvelopeIcon />
        </template>
      </InputText>
      <UIButton> Añadir candidato </UIButton>
    </div>
    <div class="flex flex-nowrap overflow-x-auto gap-3 flex-1">
      <BoardColumn title="New" color="green">
        <template #title-icon>
          <InboxIcon />
        </template>
      </BoardColumn>

      <BoardColumn title="Interview" color="turquoise">
        <template #title-icon>
          <UserIcon />
        </template>
      </BoardColumn>

      <BoardColumn title="Hired" color="blue">
        <template #title-icon>
          <ConfettiIcon />
        </template>
      </BoardColumn>

      <BoardColumn title="Not selected" color="red">
        <template #title-icon>
          <StopIcon />
        </template>
      </BoardColumn>
    </div>
  </div>
</template>
