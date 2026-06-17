<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { iconHome, iconTextDocument, iconPiechart, iconTable } from '@siemens/ix-icons/icons';
import { IxApplication, IxApplicationHeader, IxAvatar, IxMenu, IxMenuItem, IxContent } from '@siemens/ix-vue';
import CompanyLogo from './components/CompanyLogo.vue';

const router = useRouter();
const route = useRoute();
</script>

<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <IxApplication>
    <IxApplicationHeader name="Siemens Industrial Experience Starter App">
      <CompanyLogo />
      <IxAvatar initials="JD" aria-label="User avatar: JD" />
    </IxApplicationHeader>

    <IxMenu enable-toggle-theme aria-label="Main navigation">
      <IxMenuItem
        :icon="iconHome"
        :active="route.path === '/'"
        @click.prevent="router.push('/')"
      >
        Get Started
      </IxMenuItem>
      <IxMenuItem
        :icon="iconTextDocument"
        :active="route.path === '/forms'"
        @click.prevent="router.push('/forms')"
      >
        Forms
      </IxMenuItem>
      <IxMenuItem
        :icon="iconPiechart"
        :active="route.path === '/charts'"
        @click.prevent="router.push('/charts')"
      >
        Charts
      </IxMenuItem>
      <IxMenuItem
        :icon="iconTable"
        :active="route.path === '/grids'"
        @click.prevent="router.push('/grids')"
      >
        Grids
      </IxMenuItem>
    </IxMenu>

    <IxContent>
      <div id="main-content">
        <router-view />
      </div>
    </IxContent>
  </IxApplication>
</template>
