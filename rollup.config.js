/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import terser from "@rollup/plugin-terser";
import preserveDirectives from "rollup-plugin-preserve-directives";

const outputOptions = {
  sourcemap: false,
  preserveModules: true,
  preserveModulesRoot: "src",
};

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist",
        format: "cjs",
        entryFileNames: "[name].cjs",
        exports: "auto",
        ...outputOptions,
      },
      {
        dir: "dist",
        format: "esm",
        ...outputOptions,
      },
    ],
    external: [/node_modules/],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      preserveDirectives(),
      terser(),
      typescript({
        tsconfig: "./tsconfig.json",
        exclude: ["**/stories/**", "**/tests/**", "./styles.css"],
      }),
      typescriptPaths(),
    ],
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
