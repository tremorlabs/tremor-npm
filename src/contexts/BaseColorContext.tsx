import { createContext } from "react";

import { BaseColors } from "lib";
import { Color } from "../lib/inputTypes";

const BaseColorContext = createContext<Color | undefined>(BaseColors.Brand);

export default BaseColorContext;
