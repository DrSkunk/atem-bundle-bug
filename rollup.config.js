import fs from "fs";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

// Strips some fields from the manifest that are not needed in the final package
// so that dependencies are not bundled twice
const mainManifestWriter = () => {
  const manifest = JSON.parse(fs.readFileSync("package.json", "utf8"));
  delete manifest.dependencies;
  delete manifest.devDependencies;
  delete manifest.scripts;
  delete manifest.type;

  return {
    name: "manifest-writer",
    buildStart: async () => {
      try {
        await fs.promises.mkdir("dist");
      } catch (e) {
        if (e.code !== "EEXIST") {
          throw e;
        }
      }
      await fs.promises.writeFile(
        "dist/package.json",
        JSON.stringify(manifest, null, 2)
      );
    },
  };
};

const main = {
  input: "./src/index.js",
  output: {
    dir: "dist",
    format: "cjs",
  },
  plugins: [
    mainManifestWriter(),
    nodeResolve({
      preferBuiltins: true,
    }),
    commonjs({
      extensions: [".js", ".cjs", ".mjs"],
    }),
  ],
};

export default [main];
