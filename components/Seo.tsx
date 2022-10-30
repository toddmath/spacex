import Head from "next/head"
import { useRouter } from "next/router"

type SeoProps = {
  date?: string
  title?: string
  description?: string
  image?: string
  type?: string
}

const Seo: React.FC<SeoProps> = ({
  date,
  title = "SpaceX",
  description = "Information on everything related with SpaceX: launches, rockets, missions, capsules, payloads, Elon Musk's tesla roadster, company info, and more.",
  image = "/static/image/spacex-logo.svg",
  type = "website",
}) => {
  const router = useRouter()

  return (
    <Head>
      <title>{title}</title>
      <meta name='robots' content='follow, index' />
      <meta name='description' content={description} />
      <link rel='canonical' href={`https://spacex-one.vercel.app${router.asPath}`} />
      <link href='/static/favicons/favicon.ico' rel='shortcut icon' />
      <meta content='#ffffff' name='theme-color' />
      <meta content='#ffffff' name='msapplication-TileColor' />
      <meta
        property='og:url'
        content={`https://spacex-one.vercel.app${router.asPath}`}
      />
      <meta property='og:type' content={type} />
      <meta property='og:site_name' content='SpaceX' />
      <meta property='og:description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:image' content={image} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@tM0Nk3y' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
      {date ? <meta property='article:published_time' content={date} /> : null}
    </Head>
  )
}

export default Seo
