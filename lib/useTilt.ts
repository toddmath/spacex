import { useEffect, useState, useCallback, useMemo, useRef } from "react"
import type { MouseEvent, TouchEvent } from "react"
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

type UseTiltProps = {
  scale?: number
  perspective?: number
  flipVertically?: boolean
  flipHorizontally?: boolean
  reset?: boolean
  transitionEasing?: string
  transitionSpeed?: number
  trackOnWindow?: boolean
  gyroscope?: boolean
  onMove?: OnMove
  onEnter?: (eventType: string) => void
  onLeave?: (eventType: string) => void
}

export const defaultProps: UseTiltProps = {
  scale: 1,
  perspective: 1000,
  flipVertically: false,
  flipHorizontally: false,
  reset: true,
  transitionEasing: "cubic-bezier(.03,.98,.52,.99)",
  transitionSpeed: 400,
  trackOnWindow: false,
  gyroscope: false,
}

function useTilt({
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
}: UseTiltProps) {
  // let tilt: Tilt | null = null;
  // let glare: Glare | null = null;

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

  const addEventListeners = () => {
    window.addEventListener("resize", setSize)
    if (trackOnWindow) {
      window.addEventListener("mouseenter", onEnter)
      window.addEventListener("mousemove", onMove)
      window.addEventListener("mouseout", onLeave)
      window.addEventListener("touchstart", onEnter)
      window.addEventListener("touchmove", onMove)
      window.addEventListener("touchend", onLeave)
    }
    if (gyroscope) {
      void addDeviceOrientationEventListener()
    }
  }

  const addDeviceOrientationEventListener = async () => {
    if (!window.DeviceOrientationEvent && process.env.NODE_ENV === "development") {
      console.warn("Browser doesn't support Device Orientation.")
      return
    }

    const requestPermission = (
      DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
    ).requestPermission
    const iOS = typeof requestPermission === "function"
    if (iOS) {
      const response = await requestPermission()
      if (response === "granted") {
        window.addEventListener("deviceorientation", onMove)
      }
      return
    }
    window.addEventListener("deviceorientation", onMove)
  }

  const removeEventListeners = () => {
    window.removeEventListener("resize", setSize)
    if (trackOnWindow) {
      window.removeEventListener("mouseenter", onEnter)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseout", onLeave)
      window.removeEventListener("touchstart", onEnter)
      window.removeEventListener("touchmove", onMove)
      window.removeEventListener("touchend", onLeave)
    }
    if (gyroscope && window.DeviceOrientationEvent) {
      window.removeEventListener("deviceorientation", onMove)
    }
  }

  const setSize = () => {
    setWrapperElSize()
    // if (glare) glare.setSize(wrapperEl.size)
  }

  const setWrapperElSize = () => {
    const rect = wrapperEl.node!.getBoundingClientRect()
    wrapperEl.size.width = wrapperEl.node!.offsetWidth
    wrapperEl.size.height = wrapperEl.node!.offsetHeight
    wrapperEl.size.left = rect.left + window.scrollX
    wrapperEl.size.top = rect.top + window.scrollY
  }

  // const initGlare = () => {
  // const { glareEnable, glareBorderRadius } = props;
  // if (!glareEnable) return;
  // glare = new Glare(wrapperEl.size, glareBorderRadius!);
  // wrapperEl.node!.appendChild(glare.glareWrapperEl);
  // }

  const mainLoop = (event: SupportedEvent) => {
    if (wrapperEl.updateAnimationId !== null) {
      cancelAnimationFrame(wrapperEl.updateAnimationId)
    }
    processInput(event)
    update(event.type)
    wrapperEl.updateAnimationId = requestAnimationFrame(renderFrame)
  }

  const onEnter = (event: SupportedEvent) => {
    const { onEnter } = props
    // Update wrapped tilt component params in case
    // - it's being manipulated (position, size, etc.) in consumed application
    // - initial (delayed) images/children load
    setSize()
    // increase performance by notifying browser 'transform' property is just about to get changed
    wrapperEl.node!.style.willChange = "transform"
    setTransitions()
    if (onEnter) onEnter(event.type)
  }

  const onMove = (event: SupportedEvent): void => {
    mainLoop(event)
    // emitOnMove(event)
  }

  // const emitOnMove = (event: SupportedEvent) => {
  //   const { onMove } = props;
  //   if (!onMove) return;
  //   let glareAngle = 0;
  //   let glareOpacity = 0;
  //   // if (glare) {
  //   //   glareAngle = glare.glareAngle;
  //   //   glareOpacity = glare.glareOpacity;
  //   // }

  //   onMove({
  //     tiltAngleX: tilt!.tiltAngleX,
  //     tiltAngleY: tilt!.tiltAngleY,
  //     tiltAngleXPercentage: tilt!.tiltAngleXPercentage,
  //     tiltAngleYPercentage: tilt!.tiltAngleYPercentage,
  //     glareAngle,
  //     glareOpacity,
  //     eventType: event.type,
  //   });
  // }

  const onLeave = (event: SupportedEvent) => {
    const { onLeave } = props
    setTransitions()

    if (onLeave) onLeave(event.type)

    if (reset) {
      const autoResetEvent = new CustomEvent<CustomEventType>(
        "autoreset" as CustomEventType
      )
      onMove(autoResetEvent)
    }
  }

  // const processInputDeviceOrientation = (event: DeviceOrientationEvent): void => {
  //   if (!event.gamma || !event.beta || !gyroscope) return;
  // const { tiltMaxAngleX, tiltMaxAngleY } = props;
  //   const angleX = event.beta; // motion of the device around the x axis in degree in the range:[-180,180]
  //   const angleY = event.gamma; // motion of the device around the y axis in degree in the range:[-90,90]
  // wrapperEl.clientPosition.xPercentage = (angleX / tiltMaxAngleX!) * 100;
  // wrapperEl.clientPosition.yPercentage = (angleY / tiltMaxAngleY!) * 100;
  //   wrapperEl.clientPosition.xPercentage = constrainToRange(wrapperEl.clientPosition.xPercentage, -100, 100);
  //   wrapperEl.clientPosition.yPercentage = constrainToRange(wrapperEl.clientPosition.yPercentage, -100, 100);
  // };

  const processInput = (event: SupportedEvent): void => {
    switch (event.type as EventType) {
      case "mousemove":
        wrapperEl.clientPosition.x = (event as MouseEvent).pageX
        wrapperEl.clientPosition.y = (event as MouseEvent).pageY
        wrapperEl.scale = scale!
        break
      case "touchmove":
        wrapperEl.clientPosition.x = (event as TouchEvent).touches[0].pageX
        wrapperEl.clientPosition.y = (event as TouchEvent).touches[0].pageY
        wrapperEl.scale = scale!
        break
      // case 'deviceorientation':
      //   processInputDeviceOrientation(event as DeviceOrientationEvent);
      //   wrapperEl.scale = scale!;
      //   break;
      // case 'autoreset':
      //   const { tiltAngleXInitial, tiltAngleYInitial, tiltMaxAngleX, tiltMaxAngleY } = props;
      //   const xPercentage = (tiltAngleXInitial! / tiltMaxAngleX!) * 100;
      //   const yPercentage = (tiltAngleYInitial! / tiltMaxAngleY!) * 100;
      //   wrapperEl.clientPosition.xPercentage = constrainToRange(xPercentage, -100, 100);
      //   wrapperEl.clientPosition.yPercentage = constrainToRange(yPercentage, -100, 100);
      //   wrapperEl.scale = 1;
      //   break;
    }
  }

  const update = (eventType: EventType | string): void => {
    const isAngleSetToDefaultAlready = eventType !== "autoreset"
    const isAngleRetrievedFromGyroscope = eventType !== "deviceorientation"
    const isPropChanged = eventType !== "propChange"
    const isUpdateCalculationNeeded =
      isAngleSetToDefaultAlready && isAngleRetrievedFromGyroscope && isPropChanged

    if (isUpdateCalculationNeeded) updateClientInput()
    // if (tiltEnable) tilt!.update(wrapperEl.clientPosition, props);
    // updateFlip();
    // tilt!.updateTiltAnglesPercentage(props);
    // if (glare) {
    //   glare.update(wrapperEl.clientPosition, props, flipVertically!, flipHorizontally!);
    // }
  }

  const updateClientInput = (): void => {
    let xTemp
    let yTemp
    if (trackOnWindow) {
      const { x, y } = wrapperEl.clientPosition
      xTemp = (y! / window.innerHeight) * 200 - 100
      yTemp = (x! / window.innerWidth) * 200 - 100
    } else {
      const {
        size: { width, height, left, top },
        clientPosition: { x, y },
      } = wrapperEl
      xTemp = ((y! - top!) / height!) * 200 - 100
      yTemp = ((x! - left!) / width!) * 200 - 100
    }
    wrapperEl.clientPosition.xPercentage = constrainToRange(xTemp, -100, 100)
    wrapperEl.clientPosition.yPercentage = constrainToRange(yTemp, -100, 100)
  }

  // const updateFlip = (): void => {
  //   if (flipVertically) {
  //     tilt!.tiltAngleX += 180;
  //     tilt!.tiltAngleY *= -1;
  //   }
  //   if (flipHorizontally) {
  //     tilt!.tiltAngleY += 180;
  //   }
  // };

  const renderFrame = (): void => {
    resetWrapperElTransform()
    renderPerspective()
    // tilt!.render(wrapperEl.node!);
    renderScale()
    // if (glare) glare.render(props);
  }

  const resetWrapperElTransform = (): void => {
    wrapperEl.node!.style.transform = ""
  }

  const renderPerspective = (): void => {
    // const { perspective } = props;
    wrapperEl.node!.style.transform += `perspective(${perspective!}px) `
  }

  const renderScale = (): void => {
    const { scale } = wrapperEl
    wrapperEl.node!.style.transform += `scale3d(${scale},${scale},${scale})`
  }

  const setTransitions = () => {
    setTransition<HTMLDivElement>(
      wrapperEl.node!,
      "all",
      transitionSpeed!,
      transitionEasing!
    )
    // if (glare) {
    //   setTransition<HTMLDivElement>(glare.glareEl, 'opacity', transitionSpeed!, transitionEasing!);
    // }
  }
}

export default useTilt
