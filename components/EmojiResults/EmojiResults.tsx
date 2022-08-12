import React from "react";
import { Letter, Letters } from "../../models/pokedle";
import { useMemo } from "react";

type EmojiResultsProps = {
  letters: Letter[][];
};

export const EmojiResults = ({ letters }: EmojiResultsProps) => {
  const emojis = useMemo(() => Letters.generateEmojis(letters), [letters]);

  return <pre>{emojis}</pre>;
};
