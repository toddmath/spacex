import { Html, Head, Main, NextScript } from "next/document"
// import cn from "classnames"

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link href='/static/favicons/favicon.ico' rel='shortcut icon' />
        {/* <link
          href='https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10..0,100..900&display=optional'
          rel='stylesheet'
        /> */}
        {/* <link href='/static/favicons/site.webmanifest' rel='manifest' /> */}
        {/* <link
          href='/static/favicons/apple-touch-icon.png'
          rel='apple-touch-icon'
          sizes='180x180'
        /> */}
        {/* <link
          href='/static/favicons/favicon-32x32.png'
          rel='icon'
          sizes='32x32'
          type='image/png'
        /> */}
        {/* <link
          href='/static/favicons/favicon-16x16.png'
          rel='icon'
          sizes='16x16'
          type='image/png'
        /> */}
        {/* <link
          color='#4a9885'
          href='/static/favicons/safari-pinned-tab.svg'
          rel='mask-icon'
        /> */}
        <meta content='#ffffff' name='theme-color' />
        <meta content='#ffffff' name='msapplication-TileColor' />
        {/* <meta
          content='/static/favicons/browserconfig.xml'
          name='msapplication-config'
        /> */}
        {/* <meta content='14d2e73487fa6c71' name='yandex-verification' /> */}
        {/* <meta
          content='eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw'
          name='google-site-verification'
        /> */}
        <meta
          content='max-snippet:-1, max-image-preview:large, max-video-preview:-1'
          name='robots'
        />
      </Head>
      {/* <body className='transition-colors w-full h-full bg-neutral-50 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50'> */}
      <body className='transition-colors w-full h-full min-h-screen bg-base-100 text-base-content antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
