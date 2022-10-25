import type { RefObject, MouseEventHandler } from "react"
import { useEffect } from "react"
import useRafState from "./useRafState"
import { off, on } from "./utils"

// prettier-ignore
export interface UseMouse {
  width: number     // width
  height: number    // height
  left: number      // left
  top: number       // top
  page: Vec         // [pageX, pageY]
  pos: Vec          // [left + scrollX, top + scrollY]
  elemPos: Vec      // [pageX - pos.x , pageY - pos.y]
  // pageX: number  // pageX
  // pageY: number  // pageY
  // posX: number   // left + scrollX
  // posY: number   // top + scrollY
  // elX: number    // pageX - posX or pageX - (left + scrollX)
  // elY: number    // pageY - posY or pageY - (top + scrollY)
}

// type Pos = {
//   x: number
//   y: number
// }

// const defaultPos: Pos = { x: 0, y: 0 }

type Vec = [x: number, y: number]

export type MouseState = Pick<DOMRect, "width" | "height" | "left" | "top"> & {
  page: Vec
  pos: Vec
  elemPos: Vec
}

const defaultVec: Vec = [0, 0]

const defaultState: MouseState = {
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  pos: defaultVec,
  elemPos: defaultVec,
  page: defaultVec,
}

function useMouse(ref: RefObject<Element>): MouseState {
  if (process.env.NODE_ENV === "development") {
    if (typeof ref !== "object" || typeof ref.current === "undefined") {
      console.error("useMouse expects a single ref argument.")
    }
  }
  const [state, setState] = useRafState(defaultState)

  useEffect(() => {
    const moveHandler: MouseEventHandler = ({ pageX, pageY }) => {
      if (ref?.current) {
        const { left, top, width, height } = ref.current.getBoundingClientRect()
        const { scrollX, scrollY } = window
        const pos: Vec = [left + scrollX, top + scrollY]
        const elemPos: Vec = [pageX - pos[0], pageY - pos[1]]
        setState({
          width,
          height,
          left,
          top,
          pos,
          elemPos,
          page: [pageX, pageY],
        })
      }
    }

    on(document, "mousemove", moveHandler)

    return () => off(document, "mousemove", moveHandler)
  }, [ref, setState])
  // TODO: check if setState is really necessary above in the dependency list ⬆️

  return state
}

export default useMouse
