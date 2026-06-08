import { type FC } from "react";
import YouTube, { type YouTubeProps } from "react-youtube";
// import { YoutubeLite } from "@lite-embed/react";
// import { YouTube } from "react-youtube-lazyload";
// import "react-youtube-lazyload/dist/index.css";

// import Youtube from "react-youtube-liteframe";
// import "react-youtube-liteframe/dist/index.css";

// type Props = {
//   videoId: string;
//   autoPlay?: boolean;
//   className?: string;
//   iframeClassName?: string;
// };

type Props = Pick<
  YouTubeProps,
  "videoId" | "className" | "iframeClassName" | "opts"
> & { title?: string };

const Video: FC<Props> = ({
  videoId,
  title = "",
  className,
  iframeClassName,
  opts = {},
}) => {
  return (
    <YouTube
      videoId={videoId}
      title={title}
      loading="lazy"
      opts={opts}
      className={className}
      iframeClassName={iframeClassName}
    />
  );
};

export default Video;

// import YouTube, { type YouTubePlayer } from "react-youtube";
// import cn from "classnames";
// import dynamic from "next/dynamic";
// import {
//   TbPlayerPause,
//   TbPlayerPlay,
//   TbVolume,
//   TbVolumeOff,
// } from "react-icons/tb";
// import { RiFullscreenLine } from "react-icons/ri";

// import Loader from "./LoadingSpinner";

// type VideoProps = { videoId: string };

// const Video: FC<VideoProps> = ({ videoId }) => {
//   const [player, setPlayer] = useState<YouTubePlayer>();
//   const [playing, setPlaying] = useState(false);
//   const [volume, setVolume] = useState(0);
//   const [oldVolume, setOldVolume] = useState(0);
//   const [muted, setMuted] = useState(true);
//   // const [autoplay, setAutoplay] = useState(false);

//   const togglePlay = async () => {
//     if (player) {
//       const state = await player.getPlayerState();
//       // await (state === 1 ? player.pauseVideo() : player.playVideo());
//       if (state === 1 || playing) {
//         await player.pauseVideo();
//         setPlaying(false);
//       } else {
//         await player.playVideo();
//         setPlaying(true);
//       }
//     }
//   };

//   const toggleMute = () => {
//     if (muted) {
//       setMuted(false);
//       setVolume(oldVolume);
//     } else {
//       setMuted(true);
//       setOldVolume(volume);
//       setVolume(0);
//     }
//     // setMuted(m => !m)
//     // if (muted) setVolume(0)
//   };

//   const onVolumeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
//     const vol = e.target.valueAsNumber;
//     setVolume(vol);
//     setOldVolume(vol);
//     setMuted(vol === 0);
//   };

//   return (
//     <Suspense fallback={<Loader />}>
//       <div className="flex flex-col">
//         <YouTube videoId={videoId} onReady={(e) => setPlayer(e.target)} />
//         <div className="flex items-center">
//           <div className="btn-group justify-center">
//             <button className="btn btn-primary text-xl" onClick={togglePlay}>
//               {playing ? <TbPlayerPause /> : <TbPlayerPlay />}
//             </button>
//             <button className="btn btn-primary text-xl" onClick={toggleMute}>
//               {muted ? <TbVolumeOff /> : <TbVolume />}
//             </button>
//             <button className="btn btn-primary text-xl">
//               <RiFullscreenLine />
//             </button>
//           </div>
//           <input
//             type="range"
//             min="0"
//             max="100"
//             step="1"
//             value={volume}
//             onChange={onVolumeChange}
//             className="range range-primary range-xs max-w-xs"
//           />
//         </div>
//       </div>
//     </Suspense>
//   );
// };

// export default Video;
