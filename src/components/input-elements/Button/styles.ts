import { Sizing, fontSize, sizing, spacing, getColorClassNames } from "lib";

import { Color, ButtonVariant } from "../../../lib/inputTypes";
import { colorPalette } from "lib/theme";

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
        textColor: getColorClassNames("white").textColor,
        hoverTextColor: getColorClassNames("white").textColor,
        bgColor: getColorClassNames(color, colorPalette.background).bgColor,
        hoverBgColor: getColorClassNames(color, colorPalette.darkBackground).hoverBgColor,
        borderColor: getColorClassNames(color, colorPalette.border).borderColor,
        focusRingColor: getColorClassNames(color, colorPalette.ring).focusRingColor,
      };
    case "secondary":
      return {
        textColor: getColorClassNames(color, colorPalette.text).textColor,
        hoverTextColor: getColorClassNames(color, colorPalette.text).textColor,
        bgColor: getColorClassNames("transparent").bgColor,
        hoverBgColor: getColorClassNames(color, colorPalette.lightBackground).hoverBgColor,
        borderColor: getColorClassNames(color, colorPalette.border).borderColor,
        focusRingColor: getColorClassNames(color, colorPalette.ring).focusRingColor,
      };
    case "light":
      return {
        textColor: getColorClassNames(color, colorPalette.text).textColor,
        hoverTextColor: getColorClassNames(color, colorPalette.darkText).hoverTextColor,
        bgColor: getColorClassNames("transparent").bgColor,
        borderColor: "",
        hoverBorderColor: "",
        focusRingColor: "",
      };
  }
};
