import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";


export default async function createConfig() {
  return {
    input: "src/index.ts",

    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
    ],

    plugins: [
      peerDepsExternal(),
      commonjs(),
      resolve(),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        extensions: [".ts", ".js", ".jsx", ".tsx"],
      }),
      typescript(),
    ],

    external: ["react", "react-dom"],
  };
}
