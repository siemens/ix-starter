<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { IxApplication, IxApplicationHeader, IxAvatar, IxMenu, IxMenuItem, IxContent } from '@siemens/ix-vue';
import ErrorBoundary from './components/ErrorBoundary.vue';
import CompanyLogo from './components/CompanyLogo.vue';

const router = useRouter();
const route = useRoute();
</script>

<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <IxApplication>
    <IxApplicationHeader name="Siemens Industrial Experience Starter App">
      <div slot="logo">
        <CompanyLogo />
      </div>
      <IxAvatar initials="JD" aria-label="User avatar: JD" />
    </IxApplicationHeader>

    <IxMenu enable-toggle-theme aria-label="Main navigation">
      <IxMenuItem
        icon="home"
        :active="route.path === '/'"
        @click.prevent="router.push('/')"
      >
        Get Started
      </IxMenuItem>
      <IxMenuItem
        icon="text-document"
        :active="route.path === '/forms'"
        @click.prevent="router.push('/forms')"
      >
        Forms
      </IxMenuItem>
      <IxMenuItem
        icon="piechart"
        :active="route.path === '/charts'"
        @click.prevent="router.push('/charts')"
      >
        Charts
      </IxMenuItem>
      <IxMenuItem
        icon="table"
        :active="route.path === '/grids'"
        @click.prevent="router.push('/grids')"
      >
        Grids
      </IxMenuItem>
    </IxMenu>

    <IxContent>
      <div id="main-content" tabindex="-1">
        <ErrorBoundary>
          <router-view />
        </ErrorBoundary>
      </div>
    </IxContent>
  </IxApplication>
</template>
