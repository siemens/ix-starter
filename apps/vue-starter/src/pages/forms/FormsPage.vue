<script setup lang="ts">
import { ref } from 'vue';
import {
  IxContentHeader,
  IxTypography,
  IxInput,
  IxSelect,
  IxSelectItem,
  IxDateInput,
  IxRadioGroup,
  IxRadio,
  IxButton,
  showMessage,
} from '@siemens/ix-vue';

const INSPECTION_TYPES = [
  'Visual Inspection',
  'Dimensional Check',
  'Functional Test',
  'Safety Audit',
];

const inspectorName = ref('');
const inspectionType = ref('');
const inspectionDate = ref('');
const inspectionMode = ref('inline');

async function handleSave() {
  await showMessage({
    messageTitle: 'Confirm inspection assignment?',
    message: 'The inspection will be assigned and a notification will be sent to the inspector.',
    icon: 'question',
    centered: true,
    actions: [
      { id: 'cancel', text: 'Cancel', type: 'cancel' },
      { id: 'ok', text: 'Confirm', type: 'okay' },
    ],
  });
}
</script>

<template>
  <IxContentHeader header-title="Forms" />
  <IxTypography format="body" class="description">
    Siemens Industrial Experience provides consistent form elements for collecting and validating
    user input.
  </IxTypography>

  <form class="form-container" aria-label="Inspection assignment form" @submit.prevent>
      <IxInput
        label="Inspector Name"
        placeholder="Jane Doe"
        helper-text="Enter the certified inspector's full name"
        :value="inspectorName"
        @value-change="inspectorName = $event.detail"
      />

      <IxSelect
        label="Inspection Type"
        helper-text="Choose the inspection to perform"
        :value="inspectionType"
        @value-change="inspectionType = String($event.detail)"
      >
        <IxSelectItem v-for="type in INSPECTION_TYPES" :key="type" :value="type" :label="type" />
      </IxSelect>

      <IxDateInput
        label="Inspection Date"
        helper-text="Schedule the inspection"
        placeholder="DD/MM/YYYY"
        format="dd/MM/yyyy"
        :value="inspectionDate"
        @value-change="inspectionDate = $event.detail ?? ''"
      />

      <IxRadioGroup
        label="Inspection Mode"
        helper-text="In-line inspection takes place during production. Offline sampling requires batch removal for lab testing."
        :value="inspectionMode"
        @value-change="inspectionMode = $event.detail"
      >
        <IxRadio value="inline" label="In-line inspection" />
        <IxRadio value="offline" label="Offline sampling" />
      </IxRadioGroup>

      <div class="button-row">
        <IxButton variant="primary" aria-label="Save inspection assignment" @click="handleSave"> Save </IxButton>
      </div>
    </form>
</template>

<style scoped src="./FormsPage.css"></style>
