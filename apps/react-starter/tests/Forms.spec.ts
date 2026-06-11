import { createElement } from 'react';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';

import Forms from '../src/pages/forms/Forms';

test('renders forms page', async () => {
  const { getByText, getByRole } = await render(createElement(Forms));

  await expect.element(getByText('Forms')).toBeInTheDocument();
  await expect
    .element(getByRole('button', { name: 'Save inspection assignment' }))
    .toBeInTheDocument();
});

test('selects an inspection type and sets the select value', async () => {
  const { getByLabelText, getByRole } = await render(createElement(Forms));

  const inspectionType = getByLabelText('Inspection Type');
  await inspectionType.click();
  await getByRole('option', { name: 'Safety Audit' }).click();

  await expect.element(inspectionType).toHaveValue('Safety Audit');
});

test('changes the inspection mode radio button', async () => {
  const { getByRole } = await render(createElement(Forms));

  const offlineSampling = getByRole('radio', { name: 'Offline sampling' });
  await offlineSampling.click();

  await expect.element(offlineSampling).toBeChecked();
});
