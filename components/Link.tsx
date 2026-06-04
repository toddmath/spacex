import BaseLink from "next/link"
import { motion } from "framer-motion"

// const BaseLink = forwardRef((props, ref) => (
//   <div ref={ref} />
// ))

const Link = motion(BaseLink)

export default Link
