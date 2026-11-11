import { TestBed } from '@angular/core/testing';
import { expect, test, afterEach } from 'vitest';
import { page } from 'vitest/browser';
import { FormsComponent } from './forms.component';

async function renderFormsPage() {
  const fixture = TestBed.createComponent(FormsComponent);

  fixture.detectChanges();
  await fixture.whenStable();

  return fixture;
}

afterEach(() => {
  TestBed.resetTestingModule();
});

test('renders forms page', async () => {
  await TestBed.configureTestingModule({
    imports: [FormsComponent],
  }).compileComponents();

  await renderFormsPage();

  await expect.element(page.getByText('Forms')).toBeInTheDocument();
  await expect
    .element(page.getByRole('button', { name: 'Save inspection assignment' }))
    .toBeInTheDocument();
});

test('selects an inspection type and sets the select value', async () => {
  await TestBed.configureTestingModule({
    imports: [FormsComponent],
  }).compileComponents();

  await renderFormsPage();

  const inspectionType = page.getByLabelText('Inspection Type');
  await inspectionType.click();
  await page.getByRole('option', { name: 'Safety Audit' }).click();

  await expect.element(inspectionType).toHaveValue('Safety Audit');
});

test('changes the inspection mode radio button', async () => {
  await TestBed.configureTestingModule({
    imports: [FormsComponent],
  }).compileComponents();

  await renderFormsPage();

  const offlineSampling = page.getByRole('radio', { name: 'Offline sampling' });
  await offlineSampling.click();

  await expect.element(offlineSampling).toBeChecked();
});
