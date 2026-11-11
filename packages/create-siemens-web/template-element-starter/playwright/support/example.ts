import { type Locator, type Page } from '@playwright/test';

export class ExamplePage {
  constructor(private readonly page: Page) {}

  exampleText = (): Locator =>
    this.page
      .getByText('example')
      .or(this.page.getByText('Element'))
      .or(this.page.getByText('Lorem'))
      .and(this.page.locator('*:visible'))
      .first();
  // No await, so no waiting here. It is evaluated on every use. Per default only only one match is allowed.
  allButtons = (): Locator => this.page.locator('button, a'); // No await, so no waiting here. It is evaluated on every use.
}
