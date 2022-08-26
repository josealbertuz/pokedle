import { styled } from "../../stitches.config";
import { MdHelp } from "react-icons/md";
import { HiOutlinePresentationChartBar } from "react-icons/hi";

export const NavbarRoot = styled("nav", {
  width: "100%",
  display: "flex",
  alignItems: "center",
  margin: "0.5em",
  paddingBottom: "0.1em",
  borderBottom: "1px solid $background",
});

export const Title = styled("h1", {
  flex: 2,
  fontWeight: "bold",
  fontSize: "2rem",
  margin: 0,
  textAlign: "center",
});

export const HelpIcon = styled(MdHelp, {
  color: '$absent'
})

export const StatisticsIcon = styled(HiOutlinePresentationChartBar, {
  color: "$absent",
});