import { Suspense } from "react"
import YouTube, { type YouTubeProps } from "react-youtube"
import cn from "classnames"
// import dynamic from "next/dynamic"

import Loader from "components/LoadingSpinner"

type YoutubeOpts = {
  height?: string
  width?: string
  playerVars: NonNullable<YouTubeProps["opts"]>["playerVars"]
}

type YTProps = Omit<YouTubeProps, "loading"> & {
  loading?: string | undefined | null
}

const YoutubePlayer: React.FC<YTProps> = ({ className, loading, ...rest }) => {
  const onPlayerReady: YouTubeProps["onReady"] = event => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }

  const yt_opts: YoutubeOpts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
      color: "white",
      controls: 1,
      loop: 0,
      modestbranding: 1,
    },
  }

  return (
    <Suspense fallback={<Loader />}>
      <YouTube
        className={cn(className, "mx-auto group")}
        iframeClassName={cn(
          rest.iframeClassName,
          "object-cover w-full h-full outline-none focus-visible:outline-none"
        )}
        // opts={yt_opts}
        opts={{
          playerVars: {
            autoplay: 0,
            controls: 1,
            loop: 0,
            modestbranding: 1,
          },
        }}
        onReady={onPlayerReady}
        loading='lazy'
        {...rest}
      />
    </Suspense>
  )
}

export default YoutubePlayer
