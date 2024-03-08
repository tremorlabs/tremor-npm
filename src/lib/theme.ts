import { BaseColors } from "./constants";
import { Color } from "./inputTypes";

export const DEFAULT_COLOR: Color = "gray";
export const WHITE = "white";
export const TRANSPARENT = "transparent";

export const colorPalette = {
  canvasBackground: 50,
  lightBackground: 100,
  background: 500,
  darkBackground: 600,
  darkestBackground: 800,
  lightBorder: 200,
  border: 500,
  darkBorder: 700,
  lightRing: 200,
  ring: 300,
  iconRing: 500,
  lightText: 400,
  text: 500,
  iconText: 600,
  darkText: 700,
  darkestText: 900,
  icon: 500,
};

export const themeColorRange: Color[] = [
  BaseColors.Blue,
  BaseColors.Cyan,
  BaseColors.Sky,
  BaseColors.Indigo,
  BaseColors.Violet,
  BaseColors.Purple,
  BaseColors.Fuchsia,
  BaseColors.Slate,
  BaseColors.Gray,
  BaseColors.Zinc,
  BaseColors.Neutral,
  BaseColors.Stone,
  BaseColors.Red,
  BaseColors.Orange,
  BaseColors.Amber,
  BaseColors.Yellow,
  BaseColors.Lime,
  BaseColors.Green,
  BaseColors.Emerald,
  BaseColors.Teal,
  BaseColors.Pink,
  BaseColors.Rose,
];
