import { createElement } from "react";
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import Forms from "../src/pages/forms/Forms";

test("renders forms page", async () => {
  const { getByText, getByRole } = await render(createElement(Forms));

  await expect.element(getByText("Forms")).toBeInTheDocument();
  await expect
    .element(getByRole("button", { name: "Save inspection assignment" }))
    .toBeInTheDocument();
});
