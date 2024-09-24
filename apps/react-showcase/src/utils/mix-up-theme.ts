/*
 * SPDX-FileCopyrightText: 2022 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const colors = {
  'color-ghost': '#FFA500',
  'color-ghost--hover': '#FFD700',
  'color-ghost--active': '#FF8C00',
  'color-ghost--selected': '#FF6347',
  'color-ghost--selected-hover': '#FF4500',
  'color-ghost--selected-active': '#FF7F50',
  'color-ghost-primary--active': '#FF7F50',
  'color-ghost-primary--hover': '#FF6347',
  'color-ghost-alt': '#FFD700',
  'color-ghost-alt--hover': '#FFA500',
  'color-ghost-alt--active': '#FF8C00',
  'color-ghost-alt--selected': '#FF8C00',
  'color-ghost-alt--selected-hover': '#FF4500',
  'color-ghost-alt--selected-active': '#FF6347',
  'color-primary': '#FF6347',
  'color-primary--contrast': '#FFFFFF',
  'color-primary--hover': '#FF4500',
  'color-primary--active': '#FF8C00',
  'color-primary--disabled': '#FFA50073',
  'color-dynamic': '#FF4500',
  'color-dynamic--hover': '#FF6A00',
  'color-dynamic--active': '#FF6100',
  'color-dynamic-alt': '#FF4500',
  'color-dynamic-alt--hover': '#FF6A00',
  'color-dynamic-alt--active': '#FF6100',
  'color-secondary': '#D3D3D3',
  'color-secondary--hover': '#C0C0C0',
  'color-secondary--active': '#A9A9A9',
  'color-component-1': '#FFD700',
  'color-component-1--hover': '#FFD700',
  'color-component-1--active': '#FFA500',
  'color-component-2': '#FFA500',
  'color-component-3': '#FF8C00',
  'color-component-4': '#FF4500',
  'color-component-5': '#FF6347',
  'color-component-6': '#FF7F50',
  'color-component-7--hover': '#FF6347',
  'color-component-7': '#FF6347',
  'color-component-7--active': '#FF8C00',
  'color-component-error': '#FF0000',
  'color-component-info': '#FFA500',
  'color-component-8--hover': '#FFD700',
  'color-component-8': '#FFA500',
  'color-component-9': '#FF6347',
  'color-component-9--hover': '#FF4500',
  'color-component-9--active': '#FF7F50',
  'color-component-9--disabled': '#FFA5004D',
  'color-component-10': '#FF6347',
  'color-component-10--hover': '#FF4500',
  'color-component-10--active': '#FF7F50',
  'color-component-10--disabled': '#FFA50033',
  'color-1--hover': '#FFD700',
  'color-1--active': '#FFA500',
  'color-component-11': '#FF4500',
  'color-0': '#00000000',
  'color-1': '#FF8C00',
  'color-2': '#FF6A00',
  'color-3': '#FF6100',
  'color-4': '#FF4500',
  'color-5': '#FF6347',
  'color-6': '#FF7F50',
  'color-7': '#FFA500',
  'color-8': '#D3D3D3',
} as const;

const colors2 = {
  'color-ghost': '#E74C3C',
  'color-ghost--hover': '#3498DB',
  'color-ghost--active': '#2ECC71',
  'color-ghost--selected': '#9B59B6',
  'color-ghost--selected-hover': '#E67E22',
  'color-ghost--selected-active': '#16A085',
  'color-ghost-primary--active': '#2980B9',
  'color-ghost-primary--hover': '#F1C40F',
  'color-ghost-alt': '#1ABC9C',
  'color-ghost-alt--hover': '#E74C3C',
  'color-ghost-alt--active': '#2C3E50',
  'color-ghost-alt--selected': '#27AE60',
  'color-ghost-alt--selected-hover': '#34495E',
  'color-ghost-alt--selected-active': '#7F8C8D',
  'color-primary': '#F39C12',
  'color-primary--contrast': '#2C3E50',
  'color-primary--hover': '#D35400',
  'color-primary--active': '#3498DB',
  'color-primary--disabled': '#95A5A6',
  'color-dynamic': '#3498DB',
  'color-dynamic--hover': '#E67E22',
  'color-dynamic--active': '#27AE60',
  'color-dynamic-alt': '#8E44AD',
  'color-dynamic-alt--hover': '#9B59B6',
  'color-dynamic-alt--active': '#E74C3C',
  'color-secondary': '#16A085',
  'color-secondary--hover': '#F1C40F',
  'color-secondary--active': '#2980B9',
  'color-component-1': '#C0392B',
  'color-component-1--hover': '#3498DB',
  'color-component-1--active': '#2ECC71',
  'color-component-2': '#8E44AD',
  'color-component-3': '#D35400',
  'color-component-4': '#9B59B6',
  'color-component-5': '#16A085',
  'color-component-6': '#F39C12',
  'color-component-7--hover': '#E67E22',
  'color-component-7': '#D35400',
  'color-component-7--active': '#27AE60',
  'color-component-error': '#C0392B',
  'color-component-info': '#34495E',
  'color-component-8--hover': '#E67E22',
  'color-component-8': '#F39C12',
  'color-component-9': '#7F8C8D',
  'color-component-9--hover': '#95A5A6',
  'color-component-9--active': '#E67E22',
  'color-component-9--disabled': '#E74C3C4D',
  'color-component-10': '#2C3E50',
  'color-component-10--hover': '#8E44AD',
  'color-component-10--active': '#27AE60',
  'color-component-10--disabled': '#1ABC9C33',
  'color-1--hover': '#9B59B6',
  'color-1--active': '#2980B9',
  'color-component-11': '#F1C40F',
  'color-0': '#00000000',
  'color-1': '#E74C3C',
  'color-2': '#2C3E50',
  'color-3': '#3498DB',
  'color-4': '#D35400',
  'color-5': '#9B59B6',
  'color-6': '#16A085',
  'color-7': '#F39C12',
  'color-8': '#8E44AD',
};

const mixUpColors = [colors, colors2];
let lastMixUpColors = colors;

export function mixUp() {
  const currentColorSet =
    mixUpColors[Math.floor(Math.random() * mixUpColors.length)];
  Object.keys(currentColorSet).forEach((key: string) => {
    const value = currentColorSet[key];
    document.body.style.setProperty(`--theme-${key}`, value);
  });
  lastMixUpColors = currentColorSet as any;
}

export function revertMixUp() {
  Object.keys(lastMixUpColors).forEach((key: string) => {
    document.body.style.removeProperty(`--theme-${key}`);
  });
}
