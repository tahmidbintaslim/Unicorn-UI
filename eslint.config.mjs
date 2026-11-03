// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [{
  // `eslint .` lints everything it can reach; `next lint` used to skip these.
  ignores: [".next/**", "out/**", "build/**", "coverage/**", "next-env.d.ts", "public/storybook/**", "storybook-static/**"],
}, ...compat.extends("next/core-web-vitals", "next/typescript"), ...storybook.configs["flat/recommended"]];

export default eslintConfig;
