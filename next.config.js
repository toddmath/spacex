const isDev = process.env.NODE_ENV === "development";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline'${
      isDev ? " 'unsafe-eval'" : ""
    } https://cdn.vercel-insights.com https://va.vercel-scripts.com https://www.youtube.com https://www.youtube-nocookie.com;
    frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;
    connect-src 'self' https://api.spacexdata.com https://vitals.vercel-insights.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://i.ytimg.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

// module.exports = {
//   async headers() {
//     return [
//       {
//         source: "/(.*)",
//         headers: [
//           {
//             key: "Content-Security-Policy",
//             value: cspHeader.replace(/\n/g, ""),
//           },
//         ],
//       },
//     ];
//   },
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
  eslint: {
    ignoreDuringBuilds: true,
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
  // images: {
  //   domains: [
  //     "images2.imgbox.com",
  //     "i.imgur.com",
  //     "imgur.com",
  //     "farm1.staticflickr.com",
  //     "farm2.staticflickr.com",
  //     "farm3.staticflickr.com",
  //     "farm4.staticflickr.com",
  //     "farm5.staticflickr.com",
  //     "farm6.staticflickr.com",
  //     "live.staticflickr.com",
  //   ],
  // },
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: securityHeaders,
  //     },
  //   ];
  // },
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

// https://nextjs.org/docs/advanced-features/security-headers
// const ContentSecurityPolicy = `
//     default-src 'self';
//     script-src 'self' 'unsafe-eval' 'unsafe-inline' *.youtube.com *.twitter.com;
//     child-src *.youtube.com *.google.com *.twitter.com;
//     style-src 'self' 'unsafe-inline' *.googleapis.com;
//     img-src * blob: data:;
//     media-src 'none';
//     connect-src *;
//     font-src 'self';
// `
// const ContentSecurityPolicy = `
//     default-src 'self' vitals.vercel-insights.com;
//     script-src 'self' 'unsafe-eval' 'unsafe-inline' *.youtube.com;
//     child-src *.youtube.com *.google.com;
//     style-src 'self' 'unsafe-inline' *.googleapis.com;
//     img-src * blob: data:;
//     connect-src *;
//     object-src 'none';
//     require-trusted-types-for 'script';
// `

// const ContentSecurityPolicy = `
//   default-src 'self' vitals.vercel-insights.com;
//   script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-insights.com *.youtube.com;
//   child-src *.youtube.com *.google.com;
//   style-src 'self' 'unsafe-inline' *.googleapis.com;
//   img-src * blob: data:;
//   media-src 'none';
//   connect-src *;
//   object-src 'none';
//   base-uri 'none';
//   manifest-src 'self';
// `;

// const securityHeaders = [
//   // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
//   {
//     key: "Content-Security-Policy",
//     // value: ContentSecurityPolicy.replace(/\n/g, ""),
//     value: ContentSecurityPolicy.replace(/\s{2,}/g, " ")
//       .trim()
//       .replace(/\n/g, ""),
//   },
//   // {
//   //   key: "Accept-Encoding",
//   //   value: "gzip",
//   // },
//   // ! Probably need to delete before production
//   {
//     key: "Access-Control-Allow-Origin",
//     value: "*",
//   },
//   // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
//   {
//     key: "Referrer-Policy",
//     // value: "origin-when-cross-origin",
//     value: "no-referrer, strict-origin-when-cross-origin",
//   },
//   // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
//   {
//     key: "X-Frame-Options",
//     // value: "DENY",
//     value: "SAMEORIGIN",
//   },
//   // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
//   {
//     key: "X-Content-Type-Options",
//     value: "nosniff",
//   },
//   // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
//   {
//     key: "X-DNS-Prefetch-Control",
//     value: "on",
//   },
//   {
//     key: "X-XSS-Protection",
//     value: "1; mode=block",
//   },
//   // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
//   {
//     key: "Strict-Transport-Security",
//     value: "max-age=31536000; includeSubDomains; preload",
//   },
//   // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
//   {
//     key: "Permissions-Policy",
//     // value: "camera=(), microphone=(), geolocation=()",
//     value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
//   },
// ];

module.exports = nextConfig;
