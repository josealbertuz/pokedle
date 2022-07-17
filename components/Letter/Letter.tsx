import React from "react";
import { LetterStatus } from "../../models/pokedle";
import {
  flipAnimation,
  LetterBack,
  LetterCard,
  LetterFront,
  LetterRoot,
} from "./Letter.styles";

type LetterProps = {
  value: string;
  status: LetterStatus;
  animate?: boolean
  animationDelay: number;
};

const FLIP_ANIMATION_DURATION = 400

export const Letter = ({ value, status, animate, animationDelay }: LetterProps) => {

  const triggerAnimation = () => {
    if (!animate) return undefined;

    return {
      animation: `${flipAnimation} ${FLIP_ANIMATION_DURATION}ms ease-in-out`,
      animationDelay: `${animationDelay}ms`,
      animationFillMode: "forwards",
    };
  };

  return (
    <LetterRoot>
      <LetterCard css={triggerAnimation()}>
        <LetterBack status={status}>{value}</LetterBack>
        <LetterFront>{value}</LetterFront>
      </LetterCard>
    </LetterRoot>
  );
};
