<script lang="ts" setup>
import SidebarNavigationGroup from './SidebarNavigationGroup.vue'

type Props = InstanceType<typeof SidebarNavigationGroup>['$props']

const props = defineProps<Props>()
</script>

<template>
  <SidebarNavigationGroup />
</template>
