<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue';
import { IxTypography, IxButton } from '@siemens/ix-vue';

const error = ref<Error | null>(null);

onErrorCaptured((err: Error) => {
  console.error('Vue error caught by boundary:', err);
  error.value = err;
  return false;
});

function reload() {
  globalThis.location.reload();
}
</script>

<template>
  <div v-if="error" class="error-boundary" role="alert" aria-live="assertive">
    <IxTypography format="h1" class="title">
      Something went wrong
    </IxTypography>
    <IxTypography format="body" class="message">
      {{ error.message || 'An unexpected error occurred' }}
    </IxTypography>
    <IxButton variant="primary" class="reload-button" aria-label="Reload page" @click="reload">
      Reload Page
    </IxButton>
  </div>
  <slot v-else />
</template>

<style scoped src="./ErrorBoundary.css"></style>
