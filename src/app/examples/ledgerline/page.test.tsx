import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import LedgerlineHome from "./page";

it("ignores unknown ?joined values, including built-in object keys", async () => {
  for (const joined of ["constructor", "toString", "nope"]) {
    const { unmount } = render(await LedgerlineHome({ searchParams: Promise.resolve({ joined }) }));
    expect(screen.queryByRole("status")).toBeNull();
    unmount();
  }
});
