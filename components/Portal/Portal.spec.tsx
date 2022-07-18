import { render, screen } from "@testing-library/react";
import { Portal } from "./Portal";

const portalContent = "Hello World!";

describe("Portal", () => {
  it("should create a portal with a given child", () => {
    render(
      <Portal id="portal">
        <p>{portalContent}</p>
      </Portal>
    );

    expect(screen.getByText(portalContent)).toBeInTheDocument()
  });
});
