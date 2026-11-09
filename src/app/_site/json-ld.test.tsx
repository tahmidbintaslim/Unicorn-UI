import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { JsonLd } from "./json-ld";

it("writes parseable JSON that cannot break out of the script tag", () => {
  const { container } = render(<JsonLd data={{ name: "</script><b>x" }} />);
  const script = container.querySelector('script[type="application/ld+json"]')!;
  expect(script.innerHTML).not.toContain("</script>");
  expect(JSON.parse(script.innerHTML).name).toBe("</script><b>x");
});
