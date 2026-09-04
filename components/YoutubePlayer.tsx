import YouTube, { type YouTubeProps } from "react-youtube";
import { Suspense } from "react";
import cn from "classnames";

import Loader from "components/LoadingSpinner";

type YTProps = Omit<YouTubeProps, "loading">;

const YoutubePlayer: React.FC<YTProps> = ({ className, ...rest }) => {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  return (
    <Suspense fallback={<Loader />}>
      <YouTube
        className={cn(className, "group mx-auto")}
        iframeClassName={cn(
          rest.iframeClassName,
          "size-full object-cover outline-none focus-visible:outline-none",
        )}
        opts={{
          playerVars: {
            autoplay: 0,
            controls: 1,
            loop: 0,
            modestbranding: 1,
          },
        }}
        onReady={onPlayerReady}
        loading="lazy"
        {...rest}
      />
    </Suspense>
  );
};

export default YoutubePlayer;
