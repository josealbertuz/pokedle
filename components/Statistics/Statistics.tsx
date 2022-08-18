import React from "react";
import { Letter, Letters, Statistics as StatisticsType } from "../../models/pokedle";
import { PercentageEmojiGraphic } from "../PercentageEmojiGraphic";
import { StatInfoItem, StatisticsRoot, StatsInfoRow, Title } from "./Statistics.styles";

type StatisticsProps = {
  statistics: StatisticsType
  letters: Letter[][]
}

export const Statistics = ({statistics, letters}: StatisticsProps) => {

  return (
    <StatisticsRoot>
      <Title>Statistics</Title>
      <StatsInfoRow>
        <StatInfoItem>
          <h3>{statistics.gamesPlayed}</h3>
          <p>Played</p>
        </StatInfoItem>
        <StatInfoItem>
          <h3>{statistics.victoryPercentage} %</h3>
          <p>Win %</p>
        </StatInfoItem>
        <StatInfoItem>
          <h3>{statistics.currentStreak}</h3>
          <p>Current streak</p>
        </StatInfoItem>
        <StatInfoItem>
          <h3>{statistics.maxStreak}</h3>
          <p>Max Streak</p>
        </StatInfoItem>
      </StatsInfoRow>
      <PercentageEmojiGraphic statistics={statistics} />
      <pre>{Letters.generateEmojis(letters)}</pre>
    </StatisticsRoot>
  );
};
