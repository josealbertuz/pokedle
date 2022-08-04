import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Keyboard } from "./Keyboard";
import { createLettersArrayFixture } from "../../fixtures/letters";

const onKeyPress = jest.fn();
const pressedLetters = createLettersArrayFixture();

describe("Keyboard", () => {
  it("should call onKeyPress with key value", () => {
    render(
      <Keyboard onKeyPress={onKeyPress} pressedLetters={pressedLetters} />
    );

    fireEvent.click(screen.getByText("Q"));

    expect(onKeyPress).toHaveBeenCalledWith("Q");
  });
});
