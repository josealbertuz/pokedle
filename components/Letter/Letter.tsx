import { useAnimationControls } from "framer-motion";
import React, { useCallback, useEffect } from "react";
import { LetterStatus } from "../../models/pokedle";
import {
  LetterBack,
  LetterCard,
  LetterFront,
  LetterRoot,
} from "./Letter.styles";

type LetterProps = {
  value: string;
  status: LetterStatus;
  animate?: boolean
  flipAnimationDelay: number;
  winAnimationDelay: number
  win: boolean
};

const FLIP_ANIMATION_DURATION = 0.4
const WIN_ANIMATION_DURATION = 0.4

export const Letter = ({ value, status, animate, flipAnimationDelay, winAnimationDelay, win }: LetterProps) => {

  const controls = useAnimationControls()

  const animations = useCallback(async () => {
    animate &&
      (await controls.start({
        rotateX: 180,
        transition: {
          delay: flipAnimationDelay,
          duration: FLIP_ANIMATION_DURATION,
        },
      }));
    win &&
      (await controls.start({
        translateY: ['0%', '-50%', '10%', '0%'],
        transition: {
          delay: winAnimationDelay,
          duration: WIN_ANIMATION_DURATION,
        },
      }));
  }, [animate, flipAnimationDelay, winAnimationDelay, controls, win]);

  useEffect(() => {
    animations()
  }, [animations])

  return (
    <LetterRoot>
      <LetterCard animate={controls}>
        <LetterBack status={status}>{value}</LetterBack>
        <LetterFront>{value}</LetterFront>
      </LetterCard>
    </LetterRoot>
  );
};
