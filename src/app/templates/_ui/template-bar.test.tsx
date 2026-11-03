import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { TEMPLATES } from "../../_site/templates";
import { TemplateBar } from "./template-bar";

// Templates have their own sticky navbars; a sticky demo bar would cover them.
it("the demo bar scrolls away instead of sticking over the template's navbar", () => {
  const { container } = render(<TemplateBar template={TEMPLATES[0]} motion={false} />);
  expect(container.firstElementChild!.className).not.toMatch(/\bsticky\b/);
});
