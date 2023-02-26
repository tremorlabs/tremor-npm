import { Sizing, fontSize, sizing, spacing, colorClassNames } from "lib";

import { Color, ButtonVariant } from "../../../lib/inputTypes";
import { WHITE, colorPalette, TRANSPARENT } from "lib/theme";

export const iconSizes: { [size: string]: Sizing } = {
  xs: {
    height: sizing.md.height,
    width: sizing.md.width,
  },
  sm: {
    height: sizing.lg.height,
    width: sizing.lg.width,
  },
  md: {
    height: sizing.lg.height,
    width: sizing.lg.width,
  },
  lg: {
    height: sizing.xl.height,
    width: sizing.xl.width,
  },
  xl: {
    height: sizing.xl.height,
    width: sizing.xl.width,
  },
};

export const getButtonProportions = (variant: ButtonVariant) => {
  if (!(variant === "light")) {
    return {
      xs: {
        paddingX: spacing.md.paddingX,
        paddingY: spacing.xs.paddingY,
        fontSize: fontSize.xs,
      },
      sm: {
        paddingX: spacing.twoXl.paddingX,
        paddingY: spacing.sm.paddingY,
        fontSize: fontSize.sm,
      },
      md: {
        paddingX: spacing.twoXl.paddingX,
        paddingY: spacing.sm.paddingY,
        fontSize: fontSize.md,
      },
      lg: {
        paddingX: spacing.twoXl.paddingX,
        paddingY: spacing.md.paddingY,
        fontSize: fontSize.lg,
      },
      xl: {
        paddingX: spacing.twoXl.paddingX,
        paddingY: spacing.lg.paddingY,
        fontSize: fontSize.xl,
      },
    };
  }
  return {
    xs: {
      paddingX: "",
      paddingY: "",
      fontSize: fontSize.xs,
    },
    sm: {
      paddingX: "",
      paddingY: "",
      fontSize: fontSize.sm,
    },
    md: {
      paddingX: "",
      paddingY: "",
      fontSize: fontSize.md,
    },
    lg: {
      paddingX: "",
      paddingY: "",
      fontSize: fontSize.lg,
    },
    xl: {
      paddingX: "",
      paddingY: "",
      fontSize: fontSize.xl,
    },
  };
};

export const getButtonColors = (variant: ButtonVariant, color: Color) => {
  switch (variant) {
    case "primary":
      return {
        textColor: colorClassNames[WHITE]["none"].textColor,
        hoverTextColor: colorClassNames[WHITE]["none"].textColor,
        bgColor: colorClassNames[color][colorPalette.background].bgColor,
        hoverBgColor: colorClassNames[color][colorPalette.darkBackground].hoverBgColor,
        borderColor: colorClassNames[color][colorPalette.border].borderColor,
        focusRingColor: colorClassNames[color][colorPalette.ring].focusRingColor,
      };
    case "secondary":
      return {
        textColor: colorClassNames[color][colorPalette.text].textColor,
        hoverTextColor: colorClassNames[color][colorPalette.text].textColor,
        bgColor: colorClassNames[TRANSPARENT]["none"].bgColor,
        hoverBgColor: colorClassNames[color][colorPalette.lightBackground].hoverBgColor,
        borderColor: colorClassNames[color][colorPalette.border].borderColor,
        focusRingColor: colorClassNames[color][colorPalette.ring].focusRingColor,
      };
    case "light":
      return {
        textColor: colorClassNames[color][colorPalette.text].textColor,
        hoverTextColor: colorClassNames[color][colorPalette.darkText].hoverTextColor,
        bgColor: colorClassNames[TRANSPARENT]["none"].bgColor,
        borderColor: "",
        hoverBorderColor: "",
        focusRingColor: "",
      };
  }
};
