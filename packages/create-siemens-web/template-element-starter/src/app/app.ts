/*
 * Copyright (c) Siemens 2018 - 2026
 * SPDX-License-Identifier: MIT
 */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    class: 'si-layout-fixed-height',
  },
})
export class App {}
