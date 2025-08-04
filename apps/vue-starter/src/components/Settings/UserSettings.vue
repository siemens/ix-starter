/*
* SPDX-FileCopyrightText: 2024 Siemens AG
*
* SPDX-License-Identifier: MIT
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { themeSwitcher } from "@siemens/ix";
import { IxTypography, IxRadio, IxRadioGroup } from "@siemens/ix-vue";
import { useShowDemoMessage } from "../../helpers/demoMessage";
import brand from "../../assets/images/brand.png";
import classic from "../../assets/images/classic.png";
import styles from "./styles.module.css";

const { t, locale } = useI18n({ useScope: "global" });
const showDemoMessage = useShowDemoMessage();

const themes = [
  { name: "Siemens Brand", value: "brand", image: brand },
  { name: "Classic", value: "classic", image: classic },
];

const isBrandThemeAvailable = !!import.meta.env.VITE_THEME;
const savedTheme = localStorage.getItem("theme") as "brand" | "classic";
const defaultTheme = isBrandThemeAvailable && savedTheme === "brand" ? "brand" : "classic";
const currentTheme = ref(savedTheme || defaultTheme);

const currentLanguage = computed({
  get: () => locale.value as "en" | "de",
  set: (lang: "en" | "de") => {
    locale.value = lang;
    localStorage.setItem("language", lang);
  },
});

onMounted(() => {
  document.body.className = getThemeFullName();
  const savedLanguage = localStorage.getItem("language") as "en" | "de";
  if (savedLanguage === "en" || savedLanguage === "de") {
    currentLanguage.value = savedLanguage;
  }
});

function changeLanguage(language: "en" | "de") {
  currentLanguage.value = language;
}

function getThemeFullName(): string {
  const currentVariant = themeSwitcher.getCurrentTheme();
  const themeParts = currentVariant.split("-");
  themeParts[1] = currentTheme.value;
  return themeParts.join("-");
}

function onThemeClick(theme: 'brand' | 'classic') {
  if (!isBrandThemeAvailable) {
    showDemoMessage();
    return;
  }

  if (currentTheme.value !== theme) {
    currentTheme.value = theme;
    localStorage.setItem('theme', theme);
    document.body.className = getThemeFullName();
  }
}

</script>
<template>
  <div :class="styles.UserSettings">
    <IxTypography format="h4">{{ t("theme.title", "Theme") }}</IxTypography>
    <section :class="styles.ThemeSelection">
      <div v-for="theme in themes" :key="theme.value" :class="styles.ThemeButton"
        @click.prevent.stop="onThemeClick(theme.value as 'brand' | 'classic')">
        <div :class="[styles.ThemeImagePreview, { [styles.Active]: currentTheme === theme.value }]">
          <img :src="theme.image" :alt="`${theme.name} theme`" draggable="false" />
        </div>

        <div>
          <IxRadio :id="theme.value" :checked="currentTheme === theme.value" :label="theme.name" />
        </div>
      </div>
    </section>
    <section>
      <IxTypography :class="styles.HeadlineLanguage" format="h4">
        {{ t("language.title") }}
      </IxTypography>
      <section :class="styles.LanguageSelection">
        <IxRadioGroup>
          <IxRadio id="l_en" :checked="currentLanguage === 'en'" :label="t('language.en')"
            @checkedChange="() => changeLanguage('en')" />
          <IxRadio id="l_de" :checked="currentLanguage === 'de'" :label="t('language.de')"
            @checkedChange="() => changeLanguage('de')" />
        </IxRadioGroup>
      </section>
    </section>
  </div>
</template>