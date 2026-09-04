import { env } from "node:process";

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: env.SITE_URL || "https://spacex-one.vercel.app",
  generateRobotsTxt: true, // (optional)
  generateIndexSitemap: false,
};

export default config;
