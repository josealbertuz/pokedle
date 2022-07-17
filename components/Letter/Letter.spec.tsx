import { screen } from "@testing-library/react";
import { customRender } from "../../tests/tests-utils";
import { Letter } from "./Letter";
import { ComponentProps } from "react";
import { LetterStatus } from "../../models/pokedle";

type LetterProps = ComponentProps<typeof Letter>;

const letter: LetterProps = {
  value: "R",
  status: LetterStatus.CORRECT,
  animationDelay: 100,
  animate: true,
};

describe("Letter", () => {
  it("should render back and front side letter", () => {
    customRender(<Letter {...letter} />);

    expect(screen.getAllByText("R")).toHaveLength(2);
  });
});
