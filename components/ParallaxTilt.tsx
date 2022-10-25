// import { GlareProps } from 'features/glare/types.public';
// import { TiltProps } from 'features/tilt/types.public';
import type {
  PropsWithChildren,
  MouseEventHandler,
  MouseEvent,
  TouchEvent,
  ComponentElement,
  ComponentType,
  ComponentProps,
  EventHandler,
  ComponentPropsWithoutRef,
} from "react"
import { useEffect } from "react"

import type {
  SupportedEvent,
  EventType,
  CustomEventType,
  WrapperElement,
  DeviceOrientationEventiOS,
} from "types/tilt"
import { setTransition, constrainToRange } from "lib/tilt"

export type OnMoveParams = {
  tiltAngleX: number
  tiltAngleY: number
  tiltAngleXPercentage: number
  tiltAngleYPercentage: number
  glareAngle: number
  glareOpacity: number
  eventType: string
}

type OnMove = (onMoveParams: OnMoveParams) => void

type HtmlDivTilt = Pick<ComponentPropsWithoutRef<"div">, "className" | "style">
// type HtmlDivTilt = Pick<React.HTMLAttributes<HTMLDivElement>, "className" | "style">

// export type ReactParallaxTiltProps = TiltProps &
//   GlareProps &
type ParallaxTiltProps = PropsWithChildren<
  HtmlDivTilt &
    Partial<{
      /** Scale of the component (1.5 = 150%, 2 = 200%, etc.).*/
      scale: number
      /** The perspective property defines how far the object (wrapped/child component) is away from the user. The lower the more extreme the tilt gets.*/
      perspective: number
      /** Boolean to enable/disable vertical flip of component.*/
      flipVertically: boolean
      /** Boolean to enable/disable horizontal flip of component.*/
      flipHorizontally: boolean
      /** If the effects has to be reset on "onLeave" event.*/
      reset: boolean
      /** Easing of the transition when manipulating the component.*/
      transitionEasing: string
      /** Speed of the transition when manipulating the component.*/
      transitionSpeed: number
      /** Track mouse and touch events on the whole window.*/
      trackOnWindow: boolean
      /** Boolean to enable/disable device orientation detection.*/
      gyroscope: boolean
      /** Gets triggered when user moves on the component.*/
      onMove: OnMove
      /** Gets triggered when user enters the component.*/
      onEnter: (eventType: string) => void
      // onEnter?: MouseEventHandler
      /** Gets triggered when user leaves the component. */
      onLeave: (eventType: string) => void
      // onLeave?: MouseEventHandler
    }>
>

// const defaultGlareProps: GlareProps = {
//   glareEnable: false,
//   glareMaxOpacity: 0.7,
//   glareColor: '#ffffff',
//   glarePosition: 'bottom',
//   glareReverse: false,
//   glareBorderRadius: '0',
// };
// const defaultTiltProps: TiltProps = {
//   tiltEnable: true,
//   tiltReverse: false,
//   tiltAngleXInitial: 0,
//   tiltAngleYInitial: 0,
//   tiltMaxAngleX: 20,
//   tiltMaxAngleY: 20,
//   tiltAxis: undefined,
//   tiltAngleXManual: null,
//   tiltAngleYManual: null,
// };

const defaultProps: ParallaxTiltProps = {
  scale: 1,
  perspective: 1000,
  flipVertically: false,
  flipHorizontally: false,
  reset: true,
  transitionEasing: "cubic-bezier(.03,.98,.52,.99)",
  transitionSpeed: 400,
  trackOnWindow: false,
  gyroscope: false,
  // ...defaultTiltProps,
  // ...defaultGlareProps,
}

const ParallaxTilt: React.FC<ParallaxTiltProps> = ({
  scale = 1,
  perspective = 1000,
  flipVertically = false,
  flipHorizontally = false,
  reset = true,
  transitionEasing = "cubic-bezier(.03,.98,.52,.99)",
  transitionSpeed = 400,
  trackOnWindow = false,
  gyroscope = false,
  ...props
}) => {
  const wrapperEl: WrapperElement = {
    node: null,
    size: {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    },
    clientPosition: {
      x: null,
      y: null,
      xPercentage: 0,
      yPercentage: 0,
    },
    updateAnimationId: null,
    scale: 1,
  }

  useEffect(() => {
    return () => {}
  }, [])

  // return ()
  return <div>Hello Tilt World</div>
}

export default ParallaxTilt
