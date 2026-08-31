/*
 * Copyright (c) Siemens 2018 - 2026
 * SPDX-License-Identifier: MIT
 */

import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SiLinkDirective } from '@siemens/element-ng/link';

@Component({
  selector: 'app-get-started',
  imports: [SiLinkDirective, TranslatePipe],
  templateUrl: './get-started.html',
})
export class GetStarted {}
