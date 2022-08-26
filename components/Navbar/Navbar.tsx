import React from "react";
import { Pressable } from "../Pressable";
import { HelpIcon, NavbarRoot, StatisticsIcon, Title } from "./Navbar.styles";
import VisuallyHidden from "@reach/visually-hidden";

type NavbarProps = {
  onHelpClick: () => void
  onStatisticsClick: () => void
}

export const Navbar = ({onHelpClick, onStatisticsClick}: NavbarProps) => {
  return (
    <NavbarRoot>
      <Pressable onClick={onHelpClick}>
        <VisuallyHidden>Help</VisuallyHidden>
        <HelpIcon />
      </Pressable>
      <Title>Pokedle</Title>
      <Pressable onClick={onStatisticsClick}>
        <VisuallyHidden>Statistics</VisuallyHidden>
        <StatisticsIcon />
      </Pressable>
    </NavbarRoot>
  );
};
