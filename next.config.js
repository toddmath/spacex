import { env } from "node:process";
import { fileURLToPath } from "node:url";
import { dirname } from "path";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isDev = env.NODE_ENV === "development";

const yt = "https://www.youtube.com https://www.youtube-nocookie.com";
const vercel = "https://cdn.vercel-insights.com https://va.vercel-scripts.com";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' ${
      isDev ? "unsafe-eval" : ""
    } ${vercel} ${yt};
    child-src ${yt};
    frame-src 'self' ${yt};
    connect-src 'self' https://gateway.pipeworx.io https://api.spacexdata.com https://vitals.vercel-insights.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://i.ytimg.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    manifest-src 'self';
    upgrade-insecure-requests;
`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // reactCompiler: true,
  typedRoutes: true,
  devIndicators: {
    position: "bottom-right",
  },
  logging: {
    browserToTerminal: true,
  },
  turbopack: {
    root: __dirname,
    // browserDebugInfoInTerminal: true,
  },
  images: {
    qualities: [50, 75, 100],
    formats: ["image/webp"],
    /*
     * was ["image/avif", "image/webp"] but changed to reduce built time
     * and complexity, and because webp is widely supported.
     */
    minimumCacheTTL: 86400, // 1 day (default 4 hours = 14400)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.staticflickr.com",
      },
      {
        protocol: "https",
        hostname: "**.imgur.com",
      },
      {
        protocol: "https",
        hostname: "imgur.com",
      },
      {
        protocol: "https",
        hostname: "**.imgbox.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "photos.marinetraffic.com",
      },
      {
        protocol: "https",
        hostname: "images2.imgbox.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};

export default withFlowbiteReact(nextConfig);
