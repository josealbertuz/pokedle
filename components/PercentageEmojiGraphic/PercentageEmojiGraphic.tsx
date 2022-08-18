import React from "react";
import { MAX_TRIES } from "../../constants/pokedle";
import { Statistics } from "../../models/pokedle";
import {
  EmojiPercentage,
  PercentageEmojiGraphicRoot,
} from "./PercentageEmojiGraphic.styles";

type PercentageEmojiGraphicProps = {
  statistics: Statistics;
};

export const PercentageEmojiGraphic = ({
  statistics,
}: PercentageEmojiGraphicProps) => {
  return (
    <PercentageEmojiGraphicRoot>
      {Array.from({ length: MAX_TRIES }).map((_, index) => (
        <EmojiPercentage key={`emoji-percentage-${index}`}>
          <span>{index + 1}:</span>
          <span>{`${Statistics.emojiPercentage(
            statistics.guessesPercentages[index + 1]
          )} (${statistics.guessesPercentages[index + 1]} %)`}</span>
        </EmojiPercentage>
      ))}
      <EmojiPercentage>
        <span>X:</span>
        <span>{`${Statistics.emojiPercentage(
          statistics.failsPercentage
        )} (${statistics.failsPercentage} %)`}</span>
      </EmojiPercentage>
    </PercentageEmojiGraphicRoot>
  );
};
