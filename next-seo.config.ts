import type { OpenGraphMedia } from "next-seo/lib/types"
import { DefaultSeoProps } from "next-seo"

export const name = "SpaceX" as const

export const defaultOgImages: OpenGraphMedia[] = [
  {
    url: "/static/image/launch-og.jpeg",
    type: "image/jpeg",
    width: 1200,
    height: 603,
  },
  {
    url: "/static/image/dual-landing.jpg",
    type: "image/jpeg",
  },
]

const config: DefaultSeoProps = {
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://spacex-one.vercel.app/",
    siteName: name,
  },
  twitter: {
    handle: "@tM0Nk3y",
    site: "@tM0Nk3y",
    cardType: "summary_large_image",
  },
  canonical: "https://spacex-one.vercel.app",
  titleTemplate: `%s | ${name}`,
  defaultTitle: name,
  themeColor: "#000000",
  additionalLinkTags: [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/static/favicons/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/static/favicons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/static/favicons/favicon-16x16.png",
    },
    {
      rel: "manifest",
      href: "/static/favicons/site.webmanifest",
    },
    {
      rel: "mask-icon",
      color: "#888888",
      href: "/static/favicons/safari-pinned-tab.svg",
    },
    {
      rel: "shortcut icon",
      href: "/static/favicons/favicon.ico",
    },
  ],
  additionalMetaTags: [
    {
      name: "msapplication-TileColor",
      content: "#000000",
    },
    {
      name: "msapplication-config",
      content: "/static/favicons/browserconfig.xml",
    },
  ],
}

export default config
