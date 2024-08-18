<template>
  <form class="app-form">
    <slot />
  </form>
</template>

<style lang="postcss">
.app-form {
  @apply flex flex-col;

  /** Note: To avoid applying the margin botton to all input components, we use the direct child selector */
  & > .input-text__input {
    @apply w-full mb-5;
  }
}
</style>
