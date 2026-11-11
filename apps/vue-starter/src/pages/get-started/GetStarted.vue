<script setup lang="ts">
import { useRouter } from 'vue-router';
import { IxContentHeader, IxTypography, IxLinkButton } from '@siemens/ix-vue';

const router = useRouter();
</script>

<template>
  <IxContentHeader header-title="Get started with Siemens Industrial Experience" />
  <IxTypography format="body" class="description">
    Explore the Siemens Industrial Experience design system with our interactive starter app.
    <br />
    Build faster with ready-to-use components and documentation.
  </IxTypography>

  <IxTypography format="body" class="description-short">
    The starter app includes an application shell and three example pages featuring our most
    popular components:
  </IxTypography>

  <div class="nav-links">
    <IxLinkButton aria-label="Navigate to Forms page" @click.prevent="router.push('/forms')">Forms</IxLinkButton>
    <IxLinkButton aria-label="Navigate to Charts page" @click.prevent="router.push('/charts')">Charts</IxLinkButton>
    <IxLinkButton aria-label="Navigate to Grids page" @click.prevent="router.push('/grids')">Grids</IxLinkButton>
  </div>

  <IxTypography format="body" class="description">
    Browse the full component library in our documentation:
    <a href="https://ix.siemens.io" target="_blank" rel="noreferrer" aria-label="ix.siemens.io (opens in a new tab)">
      ix.siemens.io
    </a>
  </IxTypography>
</template>

<style scoped src="./GetStarted.css"></style>
