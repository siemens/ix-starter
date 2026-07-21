import { expect, test } from 'vitest';
import { render } from 'vitest-browser-vue';
import Forms from './../src/pages/forms/FormsPage.vue';
import Wrapper from './Wrapper';

test('renders forms page', async () => {
  const { getByText, getByRole } = await render(Wrapper, {
    props: { component: Forms },
  });

  await expect.element(getByText('Forms')).toBeInTheDocument();
  await expect
    .element(getByRole('button', { name: 'Save inspection assignment' }))
    .toBeInTheDocument();
});

test('selects an inspection type and sets the select value', async () => {
  const { getByLabelText, getByRole } = await render(Wrapper, {
    props: { component: Forms },
  });

  const inspectionType = getByLabelText('Inspection Type');
  await inspectionType.click();
  await getByRole('option', { name: 'Safety Audit' }).click();

  await expect.element(inspectionType).toHaveValue('Safety Audit');
});

test('changes the inspection mode radio button', async () => {
  const { getByRole } = await render(Wrapper, {
    props: { component: Forms },
  });

  const offlineSampling = getByRole('radio', { name: 'Offline sampling' });
  await offlineSampling.click();

  await expect.element(offlineSampling).toBeChecked();
});
