import { ColorTypes, colorClassNames } from "./colorClassNames";
import { twColorsHex } from "lib/colors";

export const getColorVariantsFromColorThemeValue = (colorThemeValue: string): ColorTypes => {
  const colorThemeValueParts = colorThemeValue.split("-");
  const baseColor = colorThemeValueParts[0];
  const colorValue = colorThemeValueParts[1];
  const colorVariants = colorClassNames[baseColor][colorValue];
  return colorVariants;
};

export const getHexFromColorThemeValue = (colorThemeValue: string): string => {
  const colorThemeValueParts = colorThemeValue.split("-");
  if (!colorThemeValue || colorThemeValueParts.length != 2) return "";
  const baseColor = colorThemeValueParts[0];
  // Currently only 500 is supported
  const hexValue = twColorsHex[baseColor][500];
  return hexValue;
};
