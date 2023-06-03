import { createContext } from "react";

import { BaseColors } from "lib";
import { Color } from "../lib/inputTypes";

const BaseColorContext = createContext<Color | undefined>(BaseColors.Blue);

export default BaseColorContext;
