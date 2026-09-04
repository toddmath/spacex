import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tailwindcss from "eslint-plugin-tailwindcss"
// import { fileURLToPath } from "node:url";
// import path from "node:path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const eslintConfig = defineConfig([
  ...nextCoreWebVitals,
  ...nextTs,
  tailwindcss.configs.recommended,
  {
    settings: {
      tailwindcss: {
        // callees: ["twMerge", "createTheme"],
        // classRegex: "^(class(Name)|theme)?$",
        cssConfigPath: "styles/globals.css",
      },
    },
    rules: {
      "react-hooks/refs": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
      "tailwindcss/no-custom-classname": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "pnpm-lock.yaml",
    "package-lock.json",
    "yarn.lock",
    "node_modules",
    "dist",
    "tmp",
    "public",
    "storybook-static",
    ".turbo",
    ".DS_Store",
    ".env",
    ".env.local",
    ".env.development.local",
    ".env.test.local",
    ".env.production.local",
    // Custom ignores:
    "*.config.js",
    "*.config.mjs",
    "*.config.cjs",
    "*.config.ts",
    "*.config.cts",
    "*.config.mts",
    "*.config.json",
    "*.config.yaml",
    "*.config.yml",
    ".agents/**",
    "coverage/**",
  ]),
]);

export default eslintConfig;
