import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const eslintConfig = defineConfig([
  ...nextCoreWebVitals,
  ...nextTs,
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
    "coverage/**",
  ]),
]);

export default eslintConfig;
