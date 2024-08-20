<script setup lang="ts">
import { useRoute } from 'vue-router'
import UITabs from '@/ui/UITabs.vue'
import VacancyBoard from '@/ui/business/vacancies/VacancyBoard.vue'

const route = useRoute()

const vacancyId = route.params.id as string

const TABS = [
  { id: 'vacancies', label: 'Vacantes' },
  { id: 'candidates', label: 'Candidatos' }
]
</script>

<template>
  <div class="flex flex-col h-full">
    <UITabs :tabs="TABS" active-tab-id="vacancies" />
    <VacancyBoard :vacancy-id="vacancyId" />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
